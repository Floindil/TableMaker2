from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.repositories.team_repository import TeamRepository
from app.repositories.person_repository import PersonRepository


class TeamService:
    def __init__(self):
        self.team_repo = TeamRepository()
        self.person_repo = PersonRepository()

    def list_teams(self, db: Session):
        return self.team_repo.list_all(db)

    def get_team(self, db: Session, team_id: int):
        return self.team_repo.get_by_id(db, team_id)

    def create_team(self, db: Session, payload):
        return self.team_repo.create(
            db,
            name=payload.name,
            abbreviation=payload.abbreviation,
            league=payload.league,
            creator_id=payload.creator_id,
            club_id=payload.club_id
        )

    def add_person_to_team(self, db: Session, team_id: int, payload):
        team = self.team_repo.get_by_id(db, team_id)
        if not team:
            raise HTTPException(status_code=404, detail="Team nicht gefunden")

        person = self.person_repo.get_by_id(db, payload.person_id)
        if not person:
            raise HTTPException(status_code=404, detail="Spieler nicht gefunden")

        return self.team_repo.add_person_to_team(
            db,
            team_id=team_id,
            person_id=payload.person_id,
            person_number=payload.person_number
        )