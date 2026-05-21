from sqlalchemy import Column, ForeignKey, Integer, UniqueConstraint
from sqlalchemy.orm import relationship
from app.core.db import Base


class TeamPerson(Base):
    __tablename__ = "team_people"

    id = Column(Integer, primary_key=True, index=True)
    team_id = Column(Integer, ForeignKey("teams.id"), nullable=False)
    person_id = Column(Integer, ForeignKey("people.id"), nullable=False)
    person_number = Column(Integer, nullable=True)

    __table_args__ = (
        UniqueConstraint("team_id", "person_id", name="uq_team_person"),
    )

    team = relationship("Team", back_populates="team_people")
    person = relationship("Person", back_populates="team_people")
    