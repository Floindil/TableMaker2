from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import players, teams
from app.core.db import Base, engine

from app.models.player import Player
from app.models.team import Team
from app.models.team_player import TeamPlayer

from app.routers import players, teams

Base.metadata.create_all(bind=engine)

app = FastAPI(title="TableMaker API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(players.router, prefix="/players", tags=["players"])
app.include_router(teams.router, prefix="/teams", tags=["teams"])


@app.get("/")
def root():
    return {"message": "TableMaker API läuft"}