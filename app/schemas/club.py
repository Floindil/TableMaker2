from pydantic import BaseModel, field_validator


class ClubCreate(BaseModel):
    name: str
    abbreviation: str | None = None


class ClubRead(BaseModel):
    id: int
    name: str
    abbreviation: str | None = None
    creator_id: int

    model_config = {"from_attributes": True}


class ClubAddPerson(BaseModel):
    person_id: int


class ClubAddUser(BaseModel):
    user_id: int


class ClubAddTeam(BaseModel):
    team_id: int


class ClubUpdate(BaseModel):
    name: str
    abbreviation: str | None = None
    creator_id: int

    @field_validator("name")
    @classmethod
    def validate_optional_names(cls, value: str | None) -> str | None:
        if value is None:
            return value
        value = value.strip()
        if not value:
            raise ValueError("Darf nicht leer sein")
        return value