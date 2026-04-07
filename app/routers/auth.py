from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from datetime import datetime, timedelta, timezone

from app.core.db import get_db
from app.core.config import settings
from app.core.security import create_access_token, create_refresh_token
from app.schemas.auth import LoginRequest, TokenResponse, RefreshRequest
from app.services.auth_service import AuthService
from app.models.refresh_token import RefreshToken

router = APIRouter(prefix="/auth", tags=["auth"])
service = AuthService()


@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    tokens = service.login(db, payload.email, payload.password)
    if not tokens:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Ungültige Zugangsdaten"
        )
    return tokens


@router.post("/logout")
def logout(payload: RefreshRequest, db: Session = Depends(get_db)):
    stored_token = (
        db.query(RefreshToken)
        .filter(RefreshToken.token == payload.refresh_token)
        .first()
    )

    if stored_token:
        stored_token.revoked = True
        db.commit()

    return {"message": "Erfolgreich ausgeloggt"}


@router.post("/refresh", response_model=TokenResponse)
def refresh_token(payload: RefreshRequest, db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Ungültiger Refresh Token"
    )

    try:
        decoded = jwt.decode(payload.refresh_token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id = int(decoded.get("sub"))
        token_type = decoded.get("type")

        if token_type != "refresh":
            raise credentials_exception
    except (JWTError, ValueError, TypeError):
        raise credentials_exception

    stored_token = (
        db.query(RefreshToken)
        .filter(RefreshToken.token == payload.refresh_token)
        .first()
    )

    if not stored_token or stored_token.revoked:
        raise credentials_exception

    if stored_token.expires_at < datetime.now(timezone.utc):
        raise credentials_exception

    new_access_token = create_access_token(user_id)
    new_refresh_token = create_refresh_token(user_id)

    stored_token.revoked = True

    new_token_entry = RefreshToken(
        user_id=user_id,
        token=new_refresh_token,
        expires_at=datetime.now(timezone.utc) + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS),
        revoked=False,
    )

    db.add(new_token_entry)
    db.commit()

    return {
        "access_token": new_access_token,
        "refresh_token": new_refresh_token,
        "token_type": "bearer",
    }