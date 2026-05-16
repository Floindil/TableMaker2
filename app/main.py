from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, players, teams
from app.core.db import Base, engine

from app.models.user import User
from app.models.role import Role
from app.models.user_role import UserRole
from app.models.refresh_token import RefreshToken
from app.models.player import Player
from app.models.team import Team
from app.models.team_player import TeamPlayer

Base.metadata.create_all(bind=engine)

app = FastAPI()

from app.routers import players, teams

Base.metadata.create_all(bind=engine)

app = FastAPI(title="TableMaker API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500",
        "http://192.168.1.111:5500",
        "http://192.168.1.104:5500",
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(players.router, prefix="/players", tags=["players"])
app.include_router(teams.router, prefix="/teams", tags=["teams"])


@app.get("/")
def root():
    return {"message": "TableMaker API läuft"}
