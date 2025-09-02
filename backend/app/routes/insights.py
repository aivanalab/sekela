from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import database, models
from collections import Counter

router = APIRouter(prefix="/insights", tags=["Insights"])

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/regions")
def regions_insight(db: Session = Depends(get_db)):
    universities = db.query(models.University).all()
    return dict(Counter([u.region for u in universities]))

@router.get("/types")
def types_insight(db: Session = Depends(get_db)):
    universities = db.query(models.University).all()
    return dict(Counter([u.type for u in universities]))

@router.get("/difficulty")
def difficulty_insight(db: Session = Depends(get_db)):
    universities = db.query(models.University).all()
    return dict(Counter([u.difficulty for u in universities]))
