from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.repositories.person_repository import PersonRepository
from app.schemas.person import PersonUpdate


class PersonService:
    def __init__(self):
        self.repo = PersonRepository()

    def list_people(self, db: Session):
        return self.repo.list_all(db)

    def get_person(self, db: Session, person_id: int):
        return self.repo.get_by_id(db, person_id)

    def create_person(self, db: Session, payload):
        return self.repo.create(
            db,
            prename=payload.prename,
            lastname=payload.lastname,
            birthdate=payload.birthdate,
            email=payload.email,
            phone=payload.phone,
            license=payload.license,
            creator_id=payload.creator_id
        )
    
    def update_person(self, db: Session, person_id: int, payload: PersonUpdate):
        person = self.repo.get_by_id(db, person_id)

        if not person:
            raise HTTPException(status_code=404, detail="Spieler nicht gefunden")

        update_data = payload.model_dump(exclude_unset=True)

        if not update_data:
            raise HTTPException(status_code=400, detail="Keine Änderungsdaten übergeben")

        return self.repo.update(db, person, **update_data)
    
    from fastapi import HTTPException

    def delete_person(self, db: Session, person_id: int):
        person = self.repo.delete(db, person_id)

        if not person:
            raise HTTPException(status_code=404, detail="Spieler nicht gefunden")