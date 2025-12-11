from sqlalchemy import Column, Integer, String, DateTime, Text, Boolean, BigInteger
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base

class Gallery(Base):
    __tablename__ = "gallery"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    caption = Column(Text, nullable=True)
    type = Column(String(10), nullable=False)  # 'image' or 'video'
    file_name = Column(String(255), nullable=False)
    file_path = Column(String(500), nullable=False)
    file_size = Column(BigInteger, nullable=True)
    mime_type = Column(String(100), nullable=True)
    alt_text = Column(String(255), nullable=True)
    is_active = Column(Boolean, default=True, nullable=False)
    display_order = Column(Integer, default=0, nullable=False)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
    created_by = Column(Integer, nullable=True)
    updated_by = Column(Integer, nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "caption": self.caption,
            "type": self.type,
            "url": self.file_path,
            "file_name": self.file_name,
            "file_size": self.file_size,
            "mime_type": self.mime_type,
            "alt_text": self.alt_text,
            "is_active": self.is_active,
            "display_order": self.display_order,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
            "created_by": self.created_by,
            "updated_by": self.updated_by
        }
