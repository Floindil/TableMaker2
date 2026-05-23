from sqlalchemy.orm import Session
from app.models.person import Person


class PersonRepository:
    def list_all(self, db: Session) -> list[Person]:
        return db.query(Person).order_by(Person.lastname, Person.prename).all()
    
    def list_all_for_user(self, db: Session, user_id: int) -> list[Person]:
        return db.query(Person).filter(Person.creator_id==user_id).order_by(Person.lastname, Person.prename).all()

    def get_by_id(self, db: Session, person_id: int) -> Person | None:
        return db.query(Person).filter(Person.id == person_id).first()

    def create(self, db: Session, **data) -> Person:
        person = Person(**data)
        db.add(person)
        db.commit()
        db.refresh(person)
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