from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from .. import crud, schemas, database

router = APIRouter(prefix="/universities", tags=["Universities"])

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=List[schemas.University])
def list_universities(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_universities(db, skip=skip, limit=limit)

@router.get("/{uni_id}", response_model=schemas.University)
def get_university(uni_id: int, db: Session = Depends(get_db)):
    uni = crud.get_university(db, uni_id)
    if not uni:
        raise HTTPException(status_code=404, detail="University not found")
    return uni
