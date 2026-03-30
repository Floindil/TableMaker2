from sqlalchemy.orm import Session
from app.models.team import Team
from app.models.team_player import TeamPlayer


class TeamRepository:
    def list_all(self, db: Session) -> list[Team]:
        return db.query(Team).order_by(Team.name).all()

    def get_by_id(self, db: Session, team_id: int) -> Team | None:
        return db.query(Team).filter(Team.id == team_id).first()

    def create(self, db: Session, **data) -> Team:
        team = Team(**data)
        db.add(team)
        db.commit()
        db.refresh(team)
        return team

    def add_player_to_team(
        self,
        db: Session,
        team_id: int,
        player_id: int,
        player_number: int | None = None
    ) -> TeamPlayer:
        link = TeamPlayer(
            team_id=team_id,
            player_id=player_id,
            player_number=player_number
        )
        db.add(link)
        db.commit()
        db.refresh(link)
        return link