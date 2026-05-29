from pydantic import BaseModel, field_validator


class TeamCreate(BaseModel):
    name: str
    league: str | None = None
    abbreviation: str | None = None
    club_id: int | None = None


class TeamRead(BaseModel):
    id: int
    name: str
    league: str | None = None
    abbreviation: str | None = None
    creator_id: int
    club_id: int | None = None

    model_config = {"from_attributes": True}


class TeamAddPerson(BaseModel):
    person_id: int


class TeamUpdate(BaseModel):
    name: str
    league: str | None = None
    abbreviation: str | None = None
    creator_id: int
    club_id: int | None = None

    @field_validator("name")
    @classmethod
    def validate_optional_names(cls, value: str | None) -> str | None:
        if value is None:
            return value
        value = value.strip()
        if not value:
            raise ValueError("Darf nicht leer sein")
        return value