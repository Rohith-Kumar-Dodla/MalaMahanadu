from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import Optional
from app.database import get_db
from fastapi.responses import FileResponse
from app.models.member import Member
from app.utils.idcard_generator import generate_id_card
from app.utils.email_service import send_membership_email
import os
import uuid
from pydantic import BaseModel, EmailStr
from datetime import datetime, timedelta

# Pydantic models for request/response
class MembershipRegisterResponse(BaseModel):
    success: bool
    membership_id: Optional[str] = None
    id_card_url: Optional[str] = None
    message: str

class MembershipResponse(BaseModel):
    id: int
    membership_id: str
    name: str
    father_name: str
    gender: str
    dob: str
    caste: str
    aadhar: str
    phone: str
    email: str
    state: str
    district: str
    mandal: str
    village: str
    address: str
    status: str
    photo_url: Optional[str] = None
    id_card_url: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

router = APIRouter()

def generate_membership_id(db: Session) -> str:
    """Generate unique membership ID in format MMN-YYYY-XXXXXX"""
    year = datetime.now().year
    
    # Get the current count for this year
    last_member = db.query(Member).filter(
        Member.membership_id.like(f"MMN-{year}-%")
    ).order_by(Member.membership_id.desc()).first()
    
    if last_member:
        # Extract the last sequence number and increment
        last_sequence = int(last_member.membership_id.split('-')[-1])
        count = last_sequence + 1
    else:
        count = 1
    
    return f"MMN-{year}-{count:06d}"

@router.post("/register", response_model=MembershipRegisterResponse)
async def register_member(
    db: Session = Depends(get_db),
    fullName: str = Form(...),
    fatherName: str = Form(...),
    gender: str = Form(...),
    dob: str = Form(...),
    caste: str = Form(...),
    aadhar: str = Form(...),
    phone: str = Form(...),
    email: str = Form(""),
    state: str = Form(...),
    district: str = Form(...),
    mandal: str = Form(...),
    village: str = Form(...),
    fullAddress: str = Form(...),
    photo: Optional[UploadFile] = File(None)
):
    try:
        print(f"Registration attempt for email: {email}, phone: {phone}")
        print(f"Form data received: fullName={fullName}, fatherName={fatherName}, gender={gender}, dob={dob}, caste={caste}, aadhar={aadhar}, phone={phone}, email={email}, state={state}, district={district}, mandal={mandal}, village={village}, fullAddress={fullAddress}")
        print(f"Photo received: {photo is not None}")
        
        # Check if email already exists (only if email is provided)
        if email:
            existing_member = db.query(Member).filter(Member.email == email).first()
            if existing_member:
                print(f"Email already exists: {email}")
                return MembershipRegisterResponse(
                    success=False,
                    message="Email already exists. Please try with a different email address."
                )
        
        # Check if phone already exists
        existing_phone = db.query(Member).filter(Member.phone == phone).first()
        if existing_phone:
            print(f"Phone already exists: {phone}")
            return MembershipRegisterResponse(
                success=False,
                message="Phone number already exists. Please try with a different phone number."
            )
        
        # Check if Aadhar already exists
        existing_aadhar = db.query(Member).filter(Member.aadhar == aadhar.replace(" ", "")).first()
        if existing_aadhar:
            print(f"Aadhar already exists: {aadhar}")
            return MembershipRegisterResponse(
                success=False,
                message="Aadhar card number already exists. Please try with a different Aadhar number."
            )
        
        print("Validations passed, proceeding with registration")
        
        # Generate membership ID
        membership_id = generate_membership_id(db)
        
        # Save photo if uploaded
        photo_url = None
        if photo:
            # Create photos directory if it doesn't exist
            photos_dir = "app/static/photos"
            os.makedirs(photos_dir, exist_ok=True)
            
            # Generate unique filename
            photo_filename = f"{membership_id}_{uuid.uuid4().hex[:8]}.jpg"
            photo_path = os.path.join(photos_dir, photo_filename)
            
            # Save photo
            with open(photo_path, "wb") as buffer:
                content = await photo.read()
                buffer.write(content)
            
            photo_url = f"/static/photos/{photo_filename}"
        
        # Create new member
        new_member = Member(
            membership_id=membership_id,
            name=fullName,
            father_name=fatherName,
            gender=gender,
            dob=dob,
            caste=caste,
            aadhar=aadhar.replace(" ", ""),
            phone=phone,
            email=email,
            state=state,
            district=district,
            mandal=mandal,
            village=village,
            address=fullAddress,
            status="pending",
            photo_url=photo_url
        )
        
        # Final validation check before committing
        final_email_check = db.query(Member).filter(Member.email == email).first()
        final_phone_check = db.query(Member).filter(Member.phone == phone).first()
        
        if final_email_check or final_phone_check:
            print(f"Duplicate detected at final check: email={final_email_check is not None}, phone={final_phone_check is not None}")
            db.rollback()
            return MembershipRegisterResponse(
                success=False,
                message="Duplicate entry detected. Please try with different email/phone."
            )
        
        db.add(new_member)
        db.commit()
        db.refresh(new_member)
        
        print(f"Successfully registered member: {membership_id}")
        
        # Generate ID card with photo if available
        photo_path = None
        if photo_url:
            # Convert URL to absolute file path
            if photo_url.startswith("/static/photos/"):
                photo_path = photo_url.replace("/static/", "app/static/")
            else:
                # Handle other photo URL formats
                photo_path = photo_url
        
        id_card_path = generate_id_card(
            membership_id=membership_id,
            name=fullName,
            village=village,
            district=district,
            phone=phone,
            state=state,
            photo_path=photo_path
        )
        
        # Update member with ID card URL
        new_member.id_card_url = f"/static/idcards/{os.path.basename(id_card_path)}?t={datetime.now().timestamp()}"
        db.commit()
        
        # Send welcome email (optional)
        try:
            await send_membership_email(
                email=email,
                name=fullName,
                membership_id=membership_id
            )
        except Exception as email_error:
            print(f"Email sending failed: {email_error}")
            # Continue even if email fails
        
        return MembershipRegisterResponse(
            success=True,
            membership_id=membership_id,
            id_card_url=new_member.id_card_url,
            message="Membership registered successfully"
        )
        
    except Exception as e:
        db.rollback()
        print(f"Registration error: {str(e)}")
        return MembershipRegisterResponse(
            success=False,
            message=f"Registration failed: {str(e)}"
        )

@router.get("/idcard/{filename}")
async def get_id_card(filename: str):
    """Serve ID card with proper MIME type"""
    id_card_path = f"app/static/idcards/{filename}"
    
    if not os.path.exists(id_card_path):
        raise HTTPException(status_code=404, detail="ID card not found")
    
    # Determine MIME type based on file extension
    if filename.lower().endswith('.png'):
        media_type = 'image/png'
    elif filename.lower().endswith('.pdf'):
        media_type = 'application/pdf'
    else:
        media_type = 'application/octet-stream'
    
    return FileResponse(
        id_card_path,
        media_type=media_type,
        filename=filename
    )

@router.get("/{membership_id}", response_model=MembershipResponse)
async def get_member(membership_id: str, db: Session = Depends(get_db)):
    member = db.query(Member).filter(Member.membership_id == membership_id).first()
    if not member:
        raise HTTPException(status_code=404, detail="Member not found")
    
    return member

@router.get("/", response_model=list[MembershipResponse])
async def get_all_members(
    skip: int = 0,
    limit: int = 100,
    search: Optional[str] = None,
    state: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Member)
    
    if search:
        query = query.filter(
            Member.name.ilike(f"%{search}%") |
            Member.phone.ilike(f"%{search}%") |
            Member.email.ilike(f"%{search}%") |
            Member.membership_id.ilike(f"%{search}%") |
            Member.aadhar.ilike(f"%{search}%")
        )
    
    if state:
        query = query.filter(Member.state == state)
    
    members = query.offset(skip).limit(limit).all()
    return members

@router.get("/stats/summary")
async def get_member_stats(db: Session = Depends(get_db)):
    total_members = db.query(Member).count()
    pending_members = db.query(Member).filter(Member.status == 'pending').count()
    approved_members = db.query(Member).filter(Member.status == 'approved').count()
    rejected_members = db.query(Member).filter(Member.status == 'rejected').count()
    
    # Get members from last 30 days
    new_members_this_month = db.query(Member).filter(
        Member.created_at >= datetime.now() - timedelta(days=30)
    ).count()
    
    # Get active members (approved)
    active_members = approved_members
    
    # Get ID cards generated count
    id_cards_generated = db.query(Member).filter(
        Member.id_card_url.isnot(None)
    ).count()
    
    return {
        "total_members": total_members,
        "pending_members": pending_members,
        "approved_members": approved_members,
        "rejected_members": rejected_members,
        "new_members_this_month": new_members_this_month,
        "active_members": active_members,
        "id_cards_generated": id_cards_generated
    }

@router.post("/{member_id}/regenerate-idcard")
async def regenerate_id_card(member_id: int, db: Session = Depends(get_db)):
    """Regenerate ID card for existing member with new format"""
    member = db.query(Member).filter(Member.id == member_id).first()
    if not member:
        raise HTTPException(status_code=404, detail="Member not found")
    
    try:
        # Generate new ID card with updated format
        photo_path = None
        if member.photo_url:
            # Convert URL to absolute file path
            if member.photo_url.startswith("/static/photos/"):
                photo_path = member.photo_url.replace("/static/", "app/static/")
            else:
                # Handle other photo URL formats
                photo_path = member.photo_url
        
        id_card_path = generate_id_card(
            membership_id=member.membership_id,
            name=member.name,
            village=member.village,
            district=member.district,
            phone=member.phone,
            state=member.state,
            photo_path=photo_path
        )
        
        # Update member with new ID card URL
        member.id_card_url = f"/static/idcards/{os.path.basename(id_card_path)}?t={datetime.now().timestamp()}"
        db.commit()
        
        return {
            "success": True,
            "message": "ID card regenerated successfully",
            "id_card_url": member.id_card_url
        }
        
    except Exception as e:
        print(f"Error regenerating ID card: {e}")
        raise HTTPException(status_code=500, detail="Failed to regenerate ID card")

@router.patch("/{member_id}/status")
async def update_member_status(
    member_id: int,
    status: str,
    db: Session = Depends(get_db)
):
    member = db.query(Member).filter(Member.id == member_id).first()
    if not member:
        raise HTTPException(status_code=404, detail="Member not found")
    
    if status not in ['pending', 'approved', 'rejected']:
        raise HTTPException(status_code=400, detail="Invalid status")
    
    member.status = status
    db.commit()
    
    return {"message": f"Member status updated to {status}"}

@router.get("/verify/{membership_id}")
async def verify_membership(membership_id: str, db: Session = Depends(get_db)):
    """Verify membership by scanning QR code - returns membership details"""
    member = db.query(Member).filter(Member.membership_id == membership_id).first()
    if not member:
        raise HTTPException(status_code=404, detail="Member not found")
    
    return {
        "success": True,
        "membership_id": member.membership_id,
        "name": member.name,
        "status": member.status,
        "village": member.village,
        "district": member.district,
        "message": f"Valid Member: {member.name} ({member.membership_id})"
    }
