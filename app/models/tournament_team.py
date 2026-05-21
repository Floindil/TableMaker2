from sqlalchemy import Column, ForeignKey, Integer, UniqueConstraint
from sqlalchemy.orm import relationship
from app.core.db import Base


class TournamentTeam(Base):
    __tablename__ = "team_tournaments"

    id = Column(Integer, primary_key=True, index=True)
    team_id = Column(Integer, ForeignKey("teams.id"), nullable=False)
    tournament_id = Column(Integer, ForeignKey("tournaments.id"), nullable=False)

    __table_args__ = (
        UniqueConstraint("team_id", "tournament_id", name="uq_tournament_team"),
    )

    team = relationship("Team", back_populates="tournament_teams")
    tournament = relationship("Tournament", back_populates="tournament_teams")