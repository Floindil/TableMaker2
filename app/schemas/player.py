from pydantic import BaseModel, EmailStr


class PlayerCreate(BaseModel):
    prename: str
    lastname: str
    birthdate: str | None = None
    email: EmailStr | None = None
    phone: str | None = None
    license: str | None = None


class PlayerRead(BaseModel):
    id: int
    prename: str
    lastname: str
    birthdate: str | None = None
    email: str | None = None
    phone: str | None = None
    license: str | None = None

    model_config = {"from_attributes": True}