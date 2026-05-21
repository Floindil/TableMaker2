from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.db import get_db
from app.core.deps import get_current_user
from app.schemas.tournament import TournamentCreate, TournamentRead, TournamentUpdate, TournamentAddPerson
from app.services.tournament_service import TournamentService

router = APIRouter(dependencies=[Depends(get_current_user)])
service = TournamentService()

DbSession = Annotated[Session, Depends(get_db)]


@router.get("/", response_model=list[TournamentRead])
def list_tournaments(db: DbSession):
    return service.list_tournaments(db)


@router.get("/{tournament_id}", response_model=TournamentRead)
def get_tournament(tournament_id: int, db: DbSession):
    tournament = service.get_tournament(db, tournament_id)
    if not tournament:
        raise HTTPException(status_code=404, detail="Tournament nicht gefunden")
    return tournament


@router.post("/", response_model=TournamentRead, status_code=201)
def create_tournament(payload: TournamentCreate, db: DbSession):
    return service.create_tournament(db, payload)


@router.patch("/{tournament_id}", response_model=TournamentRead)
def update_tournament(tournament_id: int, payload: TournamentUpdate, db: DbSession):
    return service.update_tournament(db, tournament_id, payload)


@router.delete("/{tournament_id}", status_code=204)
def delete_tournament(tournament_id: int, db: DbSession):
    service.delete_tournament(db, tournament_id)


@router.post("/{tournament_id}/teams", status_code=201)
def add_team_to_tournament(tournament_id: int, payload: TournamentAddPerson, db: DbSession):
    link = service.add_team_to_tournament(db, tournament_id, payload)
    return {
        "message": "Team zum Tournament hinzugefügt",
        "link_id": link.id
    }