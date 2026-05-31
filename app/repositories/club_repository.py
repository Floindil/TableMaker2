from sqlalchemy.orm import Session
from app.models.club import Club
from app.models.club_user import ClubUser


class ClubRepository:
    def list_all(self, db: Session) -> list[Club]:
        return db.query(Club).order_by(Club.name).all()

    def list_all_for_user(self, db: Session, user_id: int) -> list[Club]:
        return (
            db.query(Club)
            .join(Club.club_users)
            .filter(ClubUser.user_id == user_id)
            .order_by(Club.name)
            .all()
        )

    def get_by_id(self, db: Session, club_id: int) -> Club | None:
        return db.query(Club).filter(Club.id == club_id).first()

    def create(self, db: Session, **data) -> Club:
        club = Club(**data)
        db.add(club)
        db.commit()
        db.refresh(club)
        return club

    def update(self, db: Session, club: Club, **data) -> Club:
        for key, value in data.items():
            setattr(club, key, value)

        db.commit()
        db.refresh(club)
        return club
    
    def delete(self, db: Session, club_id: int):
        club = self.get_by_id(db, club_id)
        if not club:
            return None

        db.delete(club)
        db.commit()
        return club