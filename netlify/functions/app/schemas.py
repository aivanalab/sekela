from pydantic import BaseModel
from typing import List, Optional

class ProgramBase(BaseModel):
    name: str
    duration: float
    program_difficulty: Optional[str]
    prospects: Optional[str]

class Program(ProgramBase):
    id: int
    class Config:
        orm_mode = True

class FacilityBase(BaseModel):
    name: str

class Facility(FacilityBase):
    id: int
    class Config:
        orm_mode = True

class UniversityBase(BaseModel):
    name: str
    acronym: Optional[str]
    region: Optional[str]
    location: Optional[str]
    type: Optional[str]
    avg_fees: Optional[int]
    difficulty: Optional[str]
    description: Optional[str]
    admission_requirements: Optional[str]

class University(UniversityBase):
    id: int
    programs: List[Program] = []
    facilities: List[Facility] = []
    class Config:
        orm_mode = True

class WizardPreferences(BaseModel):
    region: Optional[str]
    type: Optional[str]
    max_fees: Optional[int]
    academic_interest: Optional[str]
    difficulty: Optional[str]
