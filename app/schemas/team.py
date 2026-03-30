from pydantic import BaseModel


class TeamCreate(BaseModel):
    name: str
    league: str | None = None


class TeamRead(BaseModel):
    id: int
    name: str
    league: str | None = None

    model_config = {"from_attributes": True}


class TeamAddPlayer(BaseModel):
    player_id: int
    player_number: int | None = None