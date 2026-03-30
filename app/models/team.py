from sqlalchemy import Column, Integer, String
from app.core.db import Base


class Team(Base):
    __tablename__ = "teams"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    league = Column(String, nullable=True)