from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.repositories.user_repository import UserRepository
from app.schemas.user import UserUpdate


class UserService:
    def __init__(self):
        self.repo = UserRepository()

    def list_users(self, db: Session):
        return self.repo.list_all(db)

    def get_user(self, db: Session, user_id: int):
        return self.repo.get_by_id(db, user_id)

    def create_user(self, db: Session, payload):
        return self.repo.create(
            db,
            email=payload.email,
            hashed_password=payload.hashed_password,
        )
    
    def update_user(self, db: Session, user_id: int, payload: UserUpdate):
        user = self.repo.get_by_id(db, user_id)

        if not user:
            raise HTTPException(status_code=404, detail="User nicht gefunden")

        update_data = payload.model_dump(exclude_unset=True)

        if not update_data:
            raise HTTPException(status_code=400, detail="Keine Änderungsdaten übergeben")

        return self.repo.update(db, user, **update_data)
    
    from fastapi import HTTPException

    def delete_user(self, db: Session, user_id: int):
        user = self.repo.delete(db, user_id)

        if not user:
            raise HTTPException(status_code=404, detail="User nicht gefunden")