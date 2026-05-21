from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.db import get_db
from app.core.deps import get_current_user
from app.models.user import User
from app.schemas.person import PersonCreate, PersonRead, PersonUpdate
from app.services.person_service import PersonService

router = APIRouter(dependencies=[Depends(get_current_user)])
service = PersonService()

DbSession = Annotated[Session, Depends(get_db)]


@router.get("/", response_model=list[PersonRead])
def list_people(db: DbSession):
    return service.list_people(db)


@router.get("/{person_id}", response_model=PersonRead)
def get_person(person_id: int, db: DbSession):
    person = service.get_person(db, person_id)
    if not person:
        raise HTTPException(status_code=404, detail="Person nicht gefunden")
    return person


@router.post("/", response_model=PersonRead, status_code=201)
def create_person(
    payload: PersonCreate,
    db: DbSession,
    current_user: User = Depends(get_current_user)
):
    payload.creator_id = current_user.id
    return service.create_person(db, **payload.model_dump())


@router.patch("/{person_id}", response_model=PersonRead)
def update_person(person_id: int, payload: PersonUpdate, db: DbSession):
    return service.update_person(db, person_id, payload)


@router.delete("/{person_id}", status_code=204)
def delete_person(person_id: int, db: DbSession):
    service.delete_person(db, person_id)