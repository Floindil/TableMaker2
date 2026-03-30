from sqlalchemy import Column, ForeignKey, Integer, UniqueConstraint
from app.core.db import Base


class TeamPlayer(Base):
    __tablename__ = "team_players"

    id = Column(Integer, primary_key=True, index=True)
    team_id = Column(Integer, ForeignKey("teams.id"), nullable=False)
    player_id = Column(Integer, ForeignKey("players.id"), nullable=False)
    player_number = Column(Integer, nullable=True)

    __table_args__ = (
        UniqueConstraint("team_id", "player_id", name="uq_team_player"),
    )