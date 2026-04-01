from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.repositories.player_repository import PlayerRepository
from app.schemas.player import PlayerUpdate


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
    
    def update_player(self, db: Session, player_id: int, payload: PlayerUpdate):
        player = self.repo.get_by_id(db, player_id)

        if not player:
            raise HTTPException(status_code=404, detail="Spieler nicht gefunden")

        update_data = payload.model_dump(exclude_unset=True)

        if not update_data:
            raise HTTPException(status_code=400, detail="Keine Änderungsdaten übergeben")

        return self.repo.update(db, player, **update_data)
    
    from fastapi import HTTPException

    def delete_player(self, db: Session, player_id: int):
        player = self.repo.delete(db, player_id)

        if not player:
            raise HTTPException(status_code=404, detail="Spieler nicht gefunden")