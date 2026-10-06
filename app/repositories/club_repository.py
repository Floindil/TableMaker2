from sqlalchemy.orm import Session
from app.models.club import Club
from app.models.club_person import ClubPerson
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
    
    def add_person_to_club(self, db: Session, club_id: int, person_id: int):
        club_person = ClubPerson(
            club_id=club_id,
            person_id=person_id,
        )

        db.add(club_person)
        db.commit()
        db.refresh(club_person)

        return club_person
    
    def remove_person_from_club(self, db: Session, club_id: int, person_id: int):
        club_person = (
            db.query(ClubPerson)
            .filter(ClubPerson.club_id == club_id)
            .filter(ClubPerson.person_id == person_id)
            .first()
        )
        if not club_person:
            return None

        db.delete(club_person)
        db.commit()

        return club_person
    
    def add_user_to_club(self, db: Session, club_id: int, user_id: int):
        club_user = ClubUser(
            club_id=club_id,
            user_id=user_id,
        )

        db.add(club_user)
        db.commit()
        db.refresh(club_user)

        return club_user