from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.db import get_db
from app.schemas.player import PlayerCreate, PlayerRead, PlayerUpdate
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


@router.patch("/{player_id}", response_model=PlayerRead)
def update_player(player_id: int, payload: PlayerUpdate, db: DbSession):
    return service.update_player(db, player_id, payload)


@router.delete("/{player_id}", status_code=204)
def delete_player(player_id: int, db: DbSession):
    service.delete_player(db, player_id)