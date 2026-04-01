from pydantic import BaseModel, EmailStr, field_validator


class PlayerCreate(BaseModel):
    prename: str
    lastname: str
    birthdate: str | None = None
    email: EmailStr | None = None
    phone: str | None = None
    license: str | None = None

    @field_validator("prename", "lastname")
    @classmethod
    def validate_names(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("Darf nicht leer sein")
        return value


class PlayerRead(BaseModel):
    id: int
    prename: str
    lastname: str
    birthdate: str | None = None
    email: EmailStr | None = None
    phone: str | None = None
    license: str | None = None

    model_config = {"from_attributes": True}

class PlayerUpdate(BaseModel):
    prename: str | None = None
    lastname: str | None = None
    birthdate: str | None = None
    email: EmailStr | None = None
    phone: str | None = None
    license: str | None = None

    @field_validator("prename", "lastname")
    @classmethod
    def validate_optional_names(cls, value: str | None) -> str | None:
        if value is None:
            return value
        value = value.strip()
        if not value:
            raise ValueError("Darf nicht leer sein")
        return value