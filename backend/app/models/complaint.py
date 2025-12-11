from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.sql import func
from app.database import Base

class Complaint(Base):
    __tablename__ = "complaints"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(20), nullable=False)
    address = Column(Text, nullable=False)
    complaint_type = Column(String(100), nullable=False)
    subject = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    file_name = Column(String(255), nullable=True)
    file_type = Column(String(100), nullable=True)
    file_path = Column(String(500), nullable=True)
    status = Column(String(20), default='pending')  # pending, in_progress, resolved, closed
    reference_id = Column(String(50), unique=True, nullable=False)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
