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

    def update(self, db: Session, player: Player, **data) -> Player:
        for key, value in data.items():
            setattr(player, key, value)

        db.commit()
        db.refresh(player)
        return player
    
    def delete(self, db: Session, player_id: int):
        player = self.get_by_id(db, player_id)
        if not player:
            return None

        db.delete(player)
        db.commit()
        return player