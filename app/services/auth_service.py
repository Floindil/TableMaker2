from datetime import datetime, timedelta, timezone
from sqlalchemy.orm import Session

from app.models.user import User
from app.models.refresh_token import RefreshToken
from app.core.security import verify_password, create_access_token, create_refresh_token, hash_password
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

        return self.create_tokens(db, user)
    
    def register(self, db: Session, email: str, password: str):
        user = db.query(User).filter(User.email == email).first()
        if user:
            return None

        user = User(
            email=email,
            hashed_password=hash_password(password)
        )

        db.add(user)
        db.commit()
        db.refresh(user)

        return self.create_tokens(db, user)
    
    def create_tokens(self, db: Session, user: User):
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
