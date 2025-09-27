from sqlalchemy.orm import Session
import models, schemas
from typing import List

def get_universities(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.University).offset(skip).limit(limit).all()

def get_university(db: Session, uni_id: int):
    return db.query(models.University).filter(models.University.id == uni_id).first()

def get_recommendations(db: Session, prefs: schemas.WizardPreferences) -> List[models.University]:
    query = db.query(models.University)
    
    if prefs.region and prefs.region != 'Any':
        query = query.filter(models.University.region == prefs.region)
    if prefs.type and prefs.type != 'Any':
        query = query.filter(models.University.type == prefs.type)
    if prefs.max_fees:
        query = query.filter(models.University.avg_fees <= prefs.max_fees)
    if prefs.difficulty and prefs.difficulty != 'Any':
        query = query.filter(models.University.difficulty == prefs.difficulty)
    if prefs.academic_interest and prefs.academic_interest != 'Any':
        interest_lower = prefs.academic_interest.lower()
        query = query.join(models.Program).filter(
            models.Program.name.ilike(f"%{interest_lower}%")
        )
    
    universities = query.all()
    
    # Sort by difficulty order
    order = ['Low', 'Medium', 'High', 'Very High']
    universities.sort(key=lambda u: order.index(u.difficulty) if u.difficulty in order else 0)
    
    return universities
