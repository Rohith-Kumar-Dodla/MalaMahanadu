from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class DonationBase(BaseModel):
    name: str
    email: str
    phone: str
    amount: float
    payment_method: str
    transaction_id: str
    notes: Optional[str] = None
    donation_date: datetime
    status: str = 'pending'

class DonationCreate(DonationBase):
    pass

class DonationUpdate(BaseModel):
    status: Optional[str] = None
    notes: Optional[str] = None

class DonationResponse(DonationBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
