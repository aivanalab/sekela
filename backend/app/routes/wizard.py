from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from .. import crud, schemas, database

router = APIRouter(prefix="/wizard", tags=["Wizard"])

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/recommendations", response_model=List[schemas.University])
def get_recommendations(preferences: schemas.WizardPreferences, db: Session = Depends(get_db)):
    return crud.get_recommendations(db, preferences)
