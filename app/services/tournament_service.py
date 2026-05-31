from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.repositories.tournament_repository import TournamentRepository
from app.repositories.team_repository import TeamRepository


class TournamentService:
    def __init__(self):
        self.tournament_repo = TournamentRepository()
        self.team_repo = TeamRepository()

    def list_tournaments(self, db: Session):
        return self.tournament_repo.list_all(db)

    def get_tournament(self, db: Session, tournament_id: int):
        return self.tournament_repo.get_by_id(db, tournament_id)

    def create_tournament(self, db: Session, payload, creator_id: int):
        return self.tournament_repo.create(
            db,
            name=payload.name,
            start_date=payload.start_date,
            end_date=payload.end_date,
            creator_id=creator_id,
            club_id=payload.club_id
        )

    def add_team_to_tournament(self, db: Session, tournament_id: int, payload):
        tournament = self.tournament_repo.get_by_id(db, tournament_id)
        if not tournament:
            raise HTTPException(status_code=404, detail="Tournament nicht gefunden")

        team = self.team_repo.get_by_id(db, payload.team_id)
        if not team:
            raise HTTPException(status_code=404, detail="Spieler nicht gefunden")

        return self.tournament_repo.add_team_to_tournament(
            db,
            tournament_id=tournament_id,
            team_id=payload.team_id
        )