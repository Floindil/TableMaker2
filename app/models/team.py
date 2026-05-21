from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from app.core.db import Base


class Team(Base):
    __tablename__ = "teams"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    abbreviation = Column(String, nullable=True)
    league = Column(String, nullable=True)

    creator_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    club_id = Column(Integer, ForeignKey("clubs.id"), nullable=True)

    creator = relationship("User", back_populates="teams")
    club = relationship("Club", back_populates="teams")

    team_people = relationship("TeamPerson", back_populates="team", cascade="all, delete-orphan")
    club_teams = relationship("ClubTeam", back_populates="team", cascade="all, delete-orphan")
    tournament_teams = relationship("TournamentTeam", back_populates="team", cascade="all, delete-orphan")
