from sqlalchemy import Column, Integer, String
from app.core.db import Base


class Player(Base):
    __tablename__ = "players"

    id = Column(Integer, primary_key=True, index=True)
    prename = Column(String, nullable=False)
    lastname = Column(String, nullable=False)
    birthdate = Column(String, nullable=True)
    email = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    license = Column(String, nullable=True)