from sqlalchemy import Column, ForeignKey, Integer, UniqueConstraint
from sqlalchemy.orm import relationship
from app.core.db import Base


class ClubPerson(Base):
    __tablename__ = "club_people"

    id = Column(Integer, primary_key=True, index=True)
    person_id = Column(Integer, ForeignKey("people.id"), nullable=False)
    club_id = Column(Integer, ForeignKey("clubs.id"), nullable=False)

    __table_args__ = (
        UniqueConstraint("person_id", "club_id", name="uq_person_club"),
    )

    person = relationship("Person", back_populates="club_people")
    club = relationship("Club", back_populates="club_people")