from sqlalchemy.orm import Session
from app.repositories.player_repository import PlayerRepository


class PlayerService:
    def __init__(self):
        self.repo = PlayerRepository()

    def list_players(self, db: Session):
        return self.repo.list_all(db)

    def get_player(self, db: Session, player_id: int):
        return self.repo.get_by_id(db, player_id)

    def create_player(self, db: Session, payload):
        return self.repo.create(
            db,
            prename=payload.prename,
            lastname=payload.lastname,
            birthdate=payload.birthdate,
            email=payload.email,
            phone=payload.phone,
            license=payload.license
        )