from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Database configuration
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "sqlite:///./mala_mahanadu.db"
)

# Create engine with database-specific settings
if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(
        DATABASE_URL,
        connect_args={"check_same_thread": False}  # SQLite specific setting
    )
else:
    engine = create_engine(DATABASE_URL)  # PostgreSQL (Railway)

# Create SessionLocal class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create Base class
Base = declarative_base()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
