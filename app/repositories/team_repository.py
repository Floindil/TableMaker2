from sqlalchemy.orm import Session
from app.models.club import Club
from app.models.team import Team
from app.models.team_person import TeamPerson


class TeamRepository:
    def list_all(self, db: Session) -> list[Team]:
        return db.query(Team).order_by(Team.name).all()
    
    def list_all_for_user(self, db: Session, user_id: int) -> list[Team]:
        return db.query(Team).filter(Team.creator_id==user_id).order_by(Team.name).all()
    
    def list_all_for_club(self, db: Session, club_id: int) -> list[Club]:
        return (
            db.query(Team)
            .filter(Team.club_id == club_id)
            .order_by(Team.name)
            .all()
        )
    
    def get_by_id(self, db: Session, team_id: int) -> Team | None:
        return db.query(Team).filter(Team.id == team_id).first()

    def create(self, db: Session, **data) -> Team:
        team = Team(**data)
        db.add(team)
        db.commit()
        db.refresh(team)
        return team

    def update(self, db: Session, team: Team, **data) -> Team:
        for key, value in data.items():
            setattr(team, key, value)

        db.commit()
        db.refresh(team)
        return team

    def delete(self, db: Session, team_id: int):
        team = self.get_by_id(db, team_id)
        if not team:
            return None

        db.delete(team)
        db.commit()
        return team

    def add_player_to_team(
        self,
        db: Session,
        team_id: int,
        player_id: int,
        player_number: int | None = None
    ) -> TeamPerson:
        link = TeamPerson(
            team_id=team_id,
            player_id=player_id,
            player_number=player_number
        )
        db.add(link)
        db.commit()
        db.refresh(link)
        return link
    
    def remove_person_from_team(self, db: Session, team_id: int, person_id: int):
        team_person = (
            db.query(TeamPerson)
            .filter(TeamPerson.team_id == team_id)
            .filter(TeamPerson.person_id == person_id)
            .first()
        )
        if not team_person:
            return None

        db.delete(team_person)
        db.commit()

        return team_person