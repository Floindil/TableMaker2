from sqlalchemy.orm import Session
from app.models.player import Player


class PlayerRepository:
    def list_all(self, db: Session) -> list[Player]:
        return db.query(Player).order_by(Player.lastname, Player.prename).all()

    def get_by_id(self, db: Session, player_id: int) -> Player | None:
        return db.query(Player).filter(Player.id == player_id).first()

    def create(self, db: Session, **data) -> Player:
        player = Player(**data)
        db.add(player)
        db.commit()
        db.refresh(player)
        return player