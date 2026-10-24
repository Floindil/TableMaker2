from sqlalchemy import Column, ForeignKey, Integer, String, select, func
from sqlalchemy.orm import relationship
from sqlalchemy.ext.hybrid import hybrid_property
from app.core.db import Base
from app.models.team_person import TeamPerson


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
    tournament_teams = relationship("TournamentTeam", back_populates="team", cascade="all, delete-orphan")

    @hybrid_property
    def person_amount(self):
        return len(self.team_people)

    @person_amount.expression
    def person_amount(cls):
        return (
            select(func.count(TeamPerson.id))
            .where(TeamPerson.team_id == cls.id)
            .correlate(cls)
            .scalar_subquery()
        )