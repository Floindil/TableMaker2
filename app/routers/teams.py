from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.db import get_db
from app.schemas.team import TeamCreate, TeamRead, TeamAddPlayer
from app.services.team_service import TeamService

router = APIRouter()
service = TeamService()

DbSession = Annotated[Session, Depends(get_db)]


@router.get("/", response_model=list[TeamRead])
def list_teams(db: DbSession):
    return service.list_teams(db)


@router.get("/{team_id}", response_model=TeamRead)
def get_team(team_id: int, db: DbSession):
    team = service.get_team(db, team_id)
    if not team:
        raise HTTPException(status_code=404, detail="Team nicht gefunden")
    return team


@router.post("/", response_model=TeamRead, status_code=201)
def create_team(payload: TeamCreate, db: DbSession):
    return service.create_team(db, payload)


@router.post("/{team_id}/players", status_code=201)
def add_player_to_team(team_id: int, payload: TeamAddPlayer, db: DbSession):
    link = service.add_player_to_team(db, team_id, payload)
    return {
        "message": "Spieler zum Team hinzugefügt",
        "link_id": link.id
    }