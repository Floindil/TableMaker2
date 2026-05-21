from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from app.core.db import Base


class Person(Base):
    __tablename__ = "people"

    id = Column(Integer, primary_key=True, index=True)
    prename = Column(String, nullable=False)
    lastname = Column(String, nullable=False)
    birthdate = Column(String, nullable=True)
    email = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    license = Column(String, nullable=True)
    
    creator_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    creator = relationship("User", back_populates="people")

    team_people = relationship("TeamPerson", back_populates="person", cascade="all, delete-orphan")
    club_people = relationship("ClubPerson", back_populates="person", cascade="all, delete-orphan")