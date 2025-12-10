from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import Optional
from app.database import get_db
from app.models.member import Member
from app.schemas.membership import MembershipCreate, MembershipResponse, MembershipRegisterResponse
from app.utils.idcard_generator import generate_id_card
from app.utils.email_service import send_membership_email
import os
import uuid
from datetime import datetime, timedelta

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
    phone: str = Form(...),
    email: str = Form(...),
    state: str = Form(...),
    district: str = Form(...),
    mandal: str = Form(...),
    village: str = Form(...),
    fullAddress: str = Form(...),
    photo: Optional[UploadFile] = File(None)
):
    try:
        print(f"Registration attempt for email: {email}, phone: {phone}")
        
        # Check if email already exists
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
        
        # Generate ID card
        id_card_path = generate_id_card(
            membership_id=membership_id,
            name=fullName,
            village=village,
            district=district
        )
        
        # Update member with ID card URL
        new_member.id_card_url = f"/static/id_cards/{os.path.basename(id_card_path)}"
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
            Member.membership_id.ilike(f"%{search}%")
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
