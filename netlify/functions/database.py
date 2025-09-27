import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Get the database URL from environment variables provided by Netlify
DATABASE_URL = os.getenv("NETLIFY_DATABASE_URL")

# The 'postgres' dialect is not supported by SQLAlchemy, it must be 'postgresql'
if DATABASE_URL and DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# Fallback to a local SQLite database if the environment variable is not set
if not DATABASE_URL:
    DATABASE_URL = "sqlite:///./universities_db.sqlite"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
