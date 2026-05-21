from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from app.core.db import Base


class Tournament(Base):
    __tablename__ = "tournaments"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)

    creator_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    club_id = Column(Integer, ForeignKey("clubs.id"), nullable=True)

    creator = relationship("User", back_populates="tournaments")
    organizer_club = relationship("Club", back_populates="organized_tournaments")

    tournament_teams = relationship("TeamTournament", back_populates="tournament", cascade="all, delete-orphan")