from sqlalchemy import Column, ForeignKey, Integer, UniqueConstraint
from sqlalchemy.orm import relationship
from app.core.db import Base


class ClubUser(Base):
    __tablename__ = "user_clubs"

    id = Column(Integer, primary_key=True, index=True)
    club_id = Column(Integer, ForeignKey("clubs.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    __table_args__ = (
        UniqueConstraint("club_id", "user_id", name="uq_club_users"),
    )

    user = relationship("User", back_populates="club_users")
    club = relationship("Club", back_populates="club_users")