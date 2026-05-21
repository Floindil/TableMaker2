from sqlalchemy.orm import Session
from app.models.user import User


class UserRepository:
    def list_all(self, db: Session) -> list[User]:
        return db.query(User).order_by(User.id).all()

    def get_by_id(self, db: Session, user_id: int) -> User | None:
        return db.query(User).filter(User.id == user_id).first()

    def create(self, db: Session, **data) -> User:
        user = User(**data)
        db.add(user)
        db.commit()
        db.refresh(user)
        return user

    def update(self, db: Session, user: User, **data) -> User:
        for key, value in data.items():
            setattr(user, key, value)

        db.commit()
        db.refresh(user)
        return user
    
    def delete(self, db: Session, user_id: int):
        user = self.get_by_id(db, user_id)
        if not user:
            return None

        db.delete(user)
        db.commit()
        return user