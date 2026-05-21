from sqlalchemy.orm import Session
from app.models.role import Role


class RoleRepository:
    def list_all(self, db: Session) -> list[Role]:
        return db.query(Role).order_by(Role.name).all()

    def get_by_id(self, db: Session, role_id: int) -> Role | None:
        return db.query(Role).filter(Role.id == role_id).first()

    def create(self, db: Session, **data) -> Role:
        role = Role(**data)
        db.add(role)
        db.commit()
        db.refresh(role)
        return role

    def update(self, db: Session, role: Role, **data) -> Role:
        for key, value in data.items():
            setattr(role, key, value)

        db.commit()
        db.refresh(role)
        return role
    
    def delete(self, db: Session, role_id: int):
        role = self.get_by_id(db, role_id)
        if not role:
            return None

        db.delete(role)
        db.commit()
        return role