from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
from app.database import get_db
from app.models.donation import Donation
from app.schemas.donation import DonationCreate, DonationResponse, DonationUpdate
import uuid
from datetime import datetime

router = APIRouter(prefix="/api/donations", tags=["donations"])

@router.post("/", response_model=DonationResponse)
async def create_donation(
    name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    amount: float = Form(...),
    payment_method: str = Form(...),
    transaction_id: str = Form(...),
    notes: Optional[str] = Form(None),
    db: Session = Depends(get_db)
):
    try:
        donation_data = DonationCreate(
            name=name,
            email=email,
            phone=phone,
            amount=amount,
            payment_method=payment_method,
            transaction_id=transaction_id,
            notes=notes,
            donation_date=datetime.utcnow()
        )
        
        donation = Donation(**donation_data.dict())
        db.add(donation)
        db.commit()
        db.refresh(donation)
        
        return donation
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/", response_model=List[DonationResponse])
def get_donations(
    skip: int = 0,
    limit: int = 100,
    status: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Donation)
    
    if status:
        query = query.filter(Donation.status == status)
    
    donations = query.offset(skip).limit(limit).all()
    return donations

@router.get("/{donation_id}", response_model=DonationResponse)
def get_donation(donation_id: int, db: Session = Depends(get_db)):
    donation = db.query(Donation).filter(Donation.id == donation_id).first()
    if not donation:
        raise HTTPException(status_code=404, detail="Donation not found")
    return donation

@router.put("/{donation_id}", response_model=DonationResponse)
def update_donation(
    donation_id: int,
    donation_update: DonationUpdate,
    db: Session = Depends(get_db)
):
    donation = db.query(Donation).filter(Donation.id == donation_id).first()
    if not donation:
        raise HTTPException(status_code=404, detail="Donation not found")
    
    update_data = donation_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(donation, field, value)
    
    db.commit()
    db.refresh(donation)
    return donation

@router.delete("/{donation_id}")
def delete_donation(donation_id: int, db: Session = Depends(get_db)):
    donation = db.query(Donation).filter(Donation.id == donation_id).first()
    if not donation:
        raise HTTPException(status_code=404, detail="Donation not found")
    
    db.delete(donation)
    db.commit()
    return {"message": "Donation deleted successfully"}

@router.get("/stats/summary")
def get_donation_stats(db: Session = Depends(get_db)):
    total_donations = db.query(Donation).count()
    pending_donations = db.query(Donation).filter(Donation.status == 'pending').count()
    verified_donations = db.query(Donation).filter(Donation.status == 'verified').count()
    acknowledged_donations = db.query(Donation).filter(Donation.status == 'acknowledged').count()
    
    total_amount = db.query(Donation).filter(Donation.status == 'verified').with_entities(
        func.sum(Donation.amount)
    ).scalar() or 0
    
    return {
        "total_donations": total_donations,
        "pending_donations": pending_donations,
        "verified_donations": verified_donations,
        "acknowledged_donations": acknowledged_donations,
        "total_amount_raised": total_amount
    }
