from pydantic import BaseModel, field_validator


class RoleCreate(BaseModel):
    name: str
    abbreviation: str | None = None
    creator_id: int


class RoleRead(BaseModel):
    id: int
    name: str
    abbreviation: str | None = None
    creator_id: int

    model_config = {"from_attributes": True}


class RoleUpdate(BaseModel):
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