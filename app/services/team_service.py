from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.repositories.team_repository import TeamRepository
from app.repositories.player_repository import PlayerRepository


class TeamService:
    def __init__(self):
        self.team_repo = TeamRepository()
        self.player_repo = PlayerRepository()

    def list_teams(self, db: Session):
        return self.team_repo.list_all(db)

    def get_team(self, db: Session, team_id: int):
        return self.team_repo.get_by_id(db, team_id)

    def create_team(self, db: Session, payload):
        return self.team_repo.create(
            db,
            name=payload.name,
            league=payload.league
        )

    def add_player_to_team(self, db: Session, team_id: int, payload):
        team = self.team_repo.get_by_id(db, team_id)
        if not team:
            raise HTTPException(status_code=404, detail="Team nicht gefunden")

        player = self.player_repo.get_by_id(db, payload.player_id)
        if not player:
            raise HTTPException(status_code=404, detail="Spieler nicht gefunden")

        return self.team_repo.add_player_to_team(
            db,
            team_id=team_id,
            player_id=payload.player_id,
            player_number=payload.player_number
        )