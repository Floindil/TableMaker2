from datetime import datetime, timedelta, timezone
from sqlalchemy.orm import Session

from app.models.user import User
from app.models.refresh_token import RefreshToken
from app.core.security import verify_password, create_access_token, create_refresh_token
from app.core.config import settings


class AuthService:
    def authenticate_user(self, db: Session, email: str, password: str) -> User | None:
        user = db.query(User).filter(User.email == email).first()
        if not user:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        return user

    def login(self, db: Session, email: str, password: str):
        user = self.authenticate_user(db, email, password)
        if not user:
            return None

        access_token = create_access_token(user.id)
        refresh_token = create_refresh_token(user.id)

        refresh_token_obj = RefreshToken(
            user_id=user.id,
            token=refresh_token,
            expires_at=datetime.now(timezone.utc) + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS),
            revoked=False,
        )

        db.add(refresh_token_obj)
        db.commit()

        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer",
        }