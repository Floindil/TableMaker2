from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.db import get_db
from app.core.deps import get_current_user
from app.schemas.role import RoleCreate, RoleRead, RoleUpdate
from app.services.role_service import RoleService

router = APIRouter(dependencies=[Depends(get_current_user)])
service = RoleService()

DbSession = Annotated[Session, Depends(get_db)]


@router.get("/", response_model=list[RoleRead])
def list_roles(db: DbSession):
    return service.list_roles(db)


@router.get("/{club_id}/", response_model=list[RoleRead])
def list_roles_for_club(club_id: int, db: DbSession):
    return service.list_roles_for_club(db, club_id)


@router.get("/{role_id}", response_model=RoleRead)
def get_role(role_id: int, db: DbSession):
    role = service.get_role(db, role_id)
    if not role:
        raise HTTPException(status_code=404, detail="Role nicht gefunden")
    return role


@router.post("/", response_model=RoleRead, status_code=201)
def create_role(payload: RoleCreate, db: DbSession):
    return service.create_role(db, payload)


@router.patch("/{role_id}", response_model=RoleRead)
def update_role(role_id: int, payload: RoleUpdate, db: DbSession):
    return service.update_role(db, role_id, payload)


@router.delete("/{role_id}", status_code=204)
def delete_role(role_id: int, db: DbSession):
    service.delete_role(db, role_id)
