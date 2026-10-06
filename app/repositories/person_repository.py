from sqlalchemy.orm import Session
from app.models.club_person import ClubPerson
from app.models.person import Person
from app.models.team_person import TeamPerson


class PersonRepository:
    def list_all(self, db: Session) -> list[Person]:
        return db.query(Person).order_by(Person.lastname, Person.prename).all()
    
    def list_all_for_user(self, db: Session, user_id: int) -> list[Person]:
        return (
            db.query(Person)
            .filter(Person.creator_id == user_id)
            .order_by(Person.lastname, Person.prename)
            .all()
        )
    
    def list_all_for_team(self, db: Session, team_id: int) -> list[Person]:
        return (
            db.query(Person)
            .join(TeamPerson.person)
            .filter(TeamPerson.team_id == team_id)
            .order_by(Person.lastname, Person.prename)
            .all()
        )

    def list_all_for_club(self, db: Session, club_id: int) -> list[Person]:
        return (
            db.query(Person)
            .join(ClubPerson.person)
            .filter(ClubPerson.club_id == club_id)
            .order_by(Person.lastname, Person.prename)
            .all()
        )

    def list_all_not_in_club(self, db: Session, club_id: int, user_id: int) -> list[Person]:
        return (
            db.query(Person)
            .filter(Person.creator_id == user_id)
            .filter(
                ~db.query(ClubPerson)
                .filter(
                    ClubPerson.person_id == Person.id,
                    ClubPerson.club_id == club_id
                )
                .exists()
            )
            .order_by(Person.lastname, Person.prename)
            .all()
        )

    def get_by_id(self, db: Session, person_id: int) -> Person | None:
        return db.query(Person).filter(Person.id == person_id).first()

    def create(self, db: Session, **data) -> Person:
        club_id = data.pop("club_id", None)
        
        person = Person(**data)
        db.add(person)
        db.flush()
        
        if club_id is not None:
            link = ClubPerson(
                person_id = person.id,
                club_id = club_id
            )
            db.add(link)

        db.commit()
        db.refresh(person)
        db.refresh(link)
    
        return person

    def update(self, db: Session, person: Person, **data) -> Person:
        for key, value in data.items():
            setattr(person, key, value)

        db.commit()
        db.refresh(person)
        return person
    
    def delete(self, db: Session, person_id: int):
        person = self.get_by_id(db, person_id)
        if not person:
            return None

        db.delete(person)
        db.commit()
        return person