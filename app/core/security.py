from datetime import datetime, timedelta, timezone
from jose import jwt
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError
from app.core.config import settings

SECRET_KEY = settings.SECRET_KEY
ALGORITHM = settings.ALGORITHM
ACCESS_TOKEN_EXPIRE_MINUTES = settings.ACCESS_TOKEN_EXPIRE_MINUTES

pw_hasher = PasswordHasher(time_cost = 3, memory_cost = 65536, parallelism = 4)


def hash_password(password: str) -> str:
    """
    Hashes a plaintext password string. 
    The resulting string securely packs the parameters, version, salt, and hash.
    """
    return pw_hasher.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verifies a plaintext password against a stored Argon2id hash string.
    """
    try:
        # The library reads the salt and settings out of the hash string itself
        pw_hasher.verify(hashed_password, plain_password)
        
        # Proactively check if the server settings have been updated since this hash was made
        if pw_hasher.check_needs_rehash(hashed_password):
            # If True, trigger a flag or a background task to update the hash in your database
            pass
            
        return True
    except VerifyMismatchError:
        # Explicitly caught to prevent generic exceptions; verify() never returns False
        return False


def create_token(data: dict, expires_delta: timedelta) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=ALGORITHM)


def create_access_token(user_id: int) -> str:
    return create_token(
        data={"sub": str(user_id), "type": "access"},
        expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES),
    )


def create_refresh_token(user_id: int) -> str:
    return create_token(
        data={"sub": str(user_id), "type": "refresh"},
        expires_delta=timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS),
    )