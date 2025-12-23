from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ComplaintBase(BaseModel):
    name: str
    email: Optional[str] = None
    phone: str
    address: str
    complaint_type: str
    subject: str
    description: str
    file_name: Optional[str] = None
    file_type: Optional[str] = None
    file_path: Optional[str] = None
    reference_id: str
    status: str = 'pending'

class ComplaintCreate(ComplaintBase):
    pass

class ComplaintUpdate(BaseModel):
    status: Optional[str] = None

class ComplaintResponse(ComplaintBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
