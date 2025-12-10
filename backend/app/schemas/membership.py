from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class MembershipCreate(BaseModel):
    fullName: str
    fatherName: str
    gender: str
    dob: str
    caste: str
    phone: str
    email: EmailStr
    state: str
    district: str
    mandal: str
    village: str
    fullAddress: str

class MembershipResponse(BaseModel):
    id: int
    membership_id: str
    name: str
    father_name: str
    gender: str
    dob: str
    caste: str
    phone: str
    email: str
    state: str
    district: str
    mandal: str
    village: str
    address: str
    photo_url: Optional[str] = None
    id_card_url: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

class MembershipRegisterResponse(BaseModel):
    success: bool
    membership_id: Optional[str] = None
    id_card_url: Optional[str] = None
    message: str
