from sqlalchemy.orm import Session
from app.models.tournament import Tournament


class TournamentRepository:
    def list_all(self, db: Session) -> list[Tournament]:
        return db.query(Tournament).order_by(Tournament.name).all()

    def get_by_id(self, db: Session, tournament_id: int) -> Tournament | None:
        return db.query(Tournament).filter(Tournament.id == tournament_id).first()

    def create(self, db: Session, **data) -> Tournament:
        tournament = Tournament(**data)
        db.add(tournament)
        db.commit()
        db.refresh(tournament)
        return tournament

    def update(self, db: Session, tournament: Tournament, **data) -> Tournament:
        for key, value in data.items():
            setattr(tournament, key, value)

        db.commit()
        db.refresh(tournament)
        return tournament
    
    def delete(self, db: Session, tournament_id: int):
        tournament = self.get_by_id(db, tournament_id)
        if not tournament:
            return None

        db.delete(tournament)
        db.commit()
        return tournament