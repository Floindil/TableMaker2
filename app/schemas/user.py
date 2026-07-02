from pydantic import BaseModel, field_validator


class UserCreate(BaseModel):
    email: str
    password: str


class UserRead(BaseModel):
    id: int
    email: str

    model_config = {"from_attributes": True}


class UserUpdate(BaseModel):
    email: str
    password: str | None = None