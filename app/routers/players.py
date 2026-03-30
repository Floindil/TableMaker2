from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.db import get_db
from app.schemas.player import PlayerCreate, PlayerRead
from app.services.player_service import PlayerService

router = APIRouter()
service = PlayerService()

DbSession = Annotated[Session, Depends(get_db)]


@router.get("/", response_model=list[PlayerRead])
def list_players(db: DbSession):
    return service.list_players(db)


@router.get("/{player_id}", response_model=PlayerRead)
def get_player(player_id: int, db: DbSession):
    player = service.get_player(db, player_id)
    if not player:
        raise HTTPException(status_code=404, detail="Spieler nicht gefunden")
    return player


@router.post("/", response_model=PlayerRead, status_code=201)
def create_player(payload: PlayerCreate, db: DbSession):
    return service.create_player(db, payload)