from sqlalchemy import Column, Integer, String, Text, Float, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class University(Base):
    __tablename__ = "universities"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    acronym = Column(String)
    region = Column(String)
    location = Column(String)
    type = Column(String)
    avg_fees = Column(Integer)
    difficulty = Column(String)
    description = Column(Text)
    admission_requirements = Column(Text)
    
    programs = relationship("Program", back_populates="university")
    facilities = relationship("Facility", back_populates="university")

class Program(Base):
    __tablename__ = "programs"
    
    id = Column(Integer, primary_key=True, index=True)
    university_id = Column(Integer, ForeignKey("universities.id"))
    name = Column(String)
    duration = Column(Float)
    program_difficulty = Column(String)
    prospects = Column(Text)
    
    university = relationship("University", back_populates="programs")

class Facility(Base):
    __tablename__ = "facilities"
    
    id = Column(Integer, primary_key=True, index=True)
    university_id = Column(Integer, ForeignKey("universities.id"))
    name = Column(String)
    
    university = relationship("University", back_populates="facilities")
