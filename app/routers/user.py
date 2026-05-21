from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.db import get_db
from app.core.deps import get_current_user
from app.schemas.user import UserCreate, UserRead, UserUpdate
from app.services.user_service import UserService

router = APIRouter(dependencies=[Depends(get_current_user)])
service = UserService()

DbSession = Annotated[Session, Depends(get_db)]


@router.get("/", response_model=list[UserRead])
def list_users(db: DbSession):
    return service.list_users(db)


@router.get("/{user_id}", response_model=UserRead)
def get_user(user_id: int, db: DbSession):
    user = service.get_user(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User nicht gefunden")
    return user


@router.post("/", response_model=UserRead, status_code=201)
def create_user(payload: UserCreate, db: DbSession):
    return service.create_user(db, payload)


@router.patch("/{user_id}", response_model=UserRead)
def update_user(user_id: int, payload: UserUpdate, db: DbSession):
    return service.update_user(db, user_id, payload)


@router.delete("/{user_id}", status_code=204)
def delete_user(user_id: int, db: DbSession):
    service.delete_user(db, user_id)
