from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.repositories.club_repository import ClubRepository
from app.repositories.person_repository import PersonRepository
from app.repositories.team_repository import TeamRepository
from app.schemas.club import ClubUpdate


class ClubService:
    def __init__(self):
        self.repo = ClubRepository()
        self.person_repo = PersonRepository()
        self.team_repo = TeamRepository()

    def list_clubs(self, db: Session):
        return self.repo.list_all(db)
    
    def list_clubs_for_user(self, db: Session, user_id):
        return self.repo.list_all_for_user(db, user_id)

    def get_club(self, db: Session, club_id: int):
        return self.repo.get_by_id(db, club_id)

    def create_club(self, db: Session, payload, owner_id: int):
        return self.repo.create(
            db,
            name=payload.name,
            abbreviation=payload.abbreviation,
            owner_id=owner_id
        )
    
    def update_club(self, db: Session, club_id: int, payload: ClubUpdate):
        club = self.repo.get_by_id(db, club_id)

        if not club:
            raise HTTPException(status_code=404, detail="Club nicht gefunden")

        update_data = payload.model_dump(exclude_unset=True)

        if not update_data:
            raise HTTPException(status_code=400, detail="Keine Änderungsdaten übergeben")

        return self.repo.update(db, club, **update_data)
    
    from fastapi import HTTPException

    def delete_club(self, db: Session, club_id: int):
        club = self.repo.delete(db, club_id)

        if not club:
            raise HTTPException(status_code=404, detail="Club nicht gefunden")
        
    def add_person_to_club(self, db: Session, club_id: int, payload):
        club = self.club_repo.get_by_id(db, club_id)
        if not club:
            raise HTTPException(status_code=404, detail="Club nicht gefunden")

        person = self.person_repo.get_by_id(db, payload.person_id)
        if not person:
            raise HTTPException(status_code=404, detail="Spieler nicht gefunden")

        return self.club_repo.add_person_to_club(
            db,
            club_id=club_id,
            person_id=payload.person_id,
        )
    
    def add_team_to_club(self, db: Session, club_id: int, payload):
        club = self.club_repo.get_by_id(db, club_id)
        if not club:
            raise HTTPException(status_code=404, detail="Club nicht gefunden")

        team = self.team_repo.get_by_id(db, payload.team_id)
        if not team:
            raise HTTPException(status_code=404, detail="Spieler nicht gefunden")

        return self.club_repo.add_team_to_club(
            db,
            club_id=club_id,
            team_id=payload.team_id,
        )