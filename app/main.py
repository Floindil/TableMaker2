from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, club, person, role, team, tournament, user
from app.core.db import Base, engine

from app.models.club_person import ClubPerson
from app.models.club_user import ClubUser
from app.models.club import Club
from app.models.person import Person
from app.models.refresh_token import RefreshToken
from app.models.role import Role
from app.models.team_person import TeamPerson
from app.models.team import Team
from app.models.tournament_team import TournamentTeam
from app.models.tournament import Tournament
from app.models.user_role import UserRole
from app.models.user import User


Base.metadata.create_all(bind=engine)

app = FastAPI()

from app.routers import team

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
app.include_router(user.router, prefix="/users", tags=["users"])
app.include_router(person.router, prefix="/people", tags=["people"])
app.include_router(team.router, prefix="/teams", tags=["teams"])
app.include_router(club.router, prefix="/clubs", tags=["clubs"])
app.include_router(tournament.router, prefix="/tournaments", tags=["tournaments"])
app.include_router(role.router, prefix="/roles", tags=["roles"])


@app.get("/")
def root():
    return {"message": "TableMaker API läuft"}
