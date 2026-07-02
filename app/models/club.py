from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from app.core.db import Base


class Club(Base):
    __tablename__ = "clubs"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    abbreviation = Column(String, nullable=True)
    description = Column(String, nullable=True)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    owner = relationship("User", back_populates="clubs")

    teams = relationship("Team", back_populates="club")
    roles = relationship("Role", back_populates="club", cascade="all, delete-orphan")
    club_users = relationship("ClubUser", back_populates="club", cascade="all, delete-orphan")
    club_people = relationship("ClubPerson", back_populates="club", cascade="all, delete-orphan")

    organized_tournaments = relationship("Tournament", back_populates="organizer_club")

    @property 
    def member_count(self):
        return len(self.club_people)