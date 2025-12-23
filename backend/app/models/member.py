from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.sql import func
from app.database import Base

class Member(Base):
    __tablename__ = "members"

    id = Column(Integer, primary_key=True, index=True)
    membership_id = Column(String(50), unique=True, index=True, nullable=False)
    name = Column(String(255), nullable=False)
    father_name = Column(String(255), nullable=False)
    gender = Column(String(10), nullable=False)
    dob = Column(String(20), nullable=False)
    caste = Column(String(100), nullable=False)
    aadhar = Column(String(12), unique=True, nullable=False)
    phone = Column(String(20), nullable=False)
    email = Column(String(255), nullable=True)
    state = Column(String(100), nullable=False)
    district = Column(String(100), nullable=False)
    mandal = Column(String(100), nullable=False)
    village = Column(String(100), nullable=False)
    address = Column(Text, nullable=False)
    status = Column(String(20), default="pending", nullable=False)
    photo_url = Column(String(500), nullable=True)
    id_card_url = Column(String(500), nullable=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
