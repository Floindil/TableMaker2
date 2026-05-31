from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.repositories.role_repository import RoleRepository
from app.schemas.role import RoleUpdate


class RoleService:
    def __init__(self):
        self.repo = RoleRepository()

    def list_roles(self, db: Session):
        return self.repo.list_all(db)

    def list_roles_for_club(self, db: Session, club_id: int):
        return self.repo.list_all_for_club(db, club_id)

    def get_role(self, db: Session, role_id: int):
        return self.repo.get_by_id(db, role_id)

    def create_role(self, db: Session, payload):
        return self.repo.create(
            db,
            name=payload.name,
            description=payload.description,
            club_id=payload.club_id
        )
    
    def update_role(self, db: Session, role_id: int, payload: RoleUpdate):
        role = self.repo.get_by_id(db, role_id)

        if not role:
            raise HTTPException(status_code=404, detail="Role nicht gefunden")

        update_data = payload.model_dump(exclude_unset=True)

        if not update_data:
            raise HTTPException(status_code=400, detail="Keine Änderungsdaten übergeben")

        return self.repo.update(db, role, **update_data)
    
    from fastapi import HTTPException

    def delete_role(self, db: Session, role_id: int):
        role = self.repo.delete(db, role_id)

        if not role:
            raise HTTPException(status_code=404, detail="Role nicht gefunden")