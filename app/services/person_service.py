from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models.user import User
from app.repositories.person_repository import PersonRepository
from app.schemas.person import PersonUpdate


class PersonService:
    def __init__(self):
        self.repo = PersonRepository()

    def list_people(self, db: Session):
        return self.repo.list_all(db)

    def list_people_for_user(self, db: Session, current_user_id: int):
        return self.repo.list_all_for_user(db, current_user_id)
    
    def list_people_for_team(self, db: Session, team_id: int):
        return self.repo.list_all_for_team(db, team_id)
    
    def list_people_for_club(self, db: Session, club_id: int):
        return self.repo.list_all_for_club(db, club_id)

    def get_person(self, db: Session, person_id: int):
        return self.repo.get_by_id(db, person_id)

    def create_person(self, db: Session, payload, current_user_id):
        return self.repo.create(
            db,
            prename=payload.prename,
            lastname=payload.lastname,
            birthdate=payload.birthdate,
            email=payload.email,
            phone=payload.phone,
            license=payload.license,
            creator_id=current_user_id
        )
    
    def update_person(self, db: Session, person_id: int, payload: PersonUpdate):
        person = self.repo.get_by_id(db, person_id)

        if not person:
            raise HTTPException(status_code=404, detail="Spieler nicht gefunden")

        update_data = payload.model_dump(exclude_unset=True)

        if not update_data:
            raise HTTPException(status_code=400, detail="Keine Änderungsdaten übergeben")

        return self.repo.update(db, person, **update_data)

    def delete_person(self, db: Session, person_id: int):
        person = self.repo.delete(db, person_id)

        if not person:
            raise HTTPException(status_code=404, detail="Spieler nicht gefunden")