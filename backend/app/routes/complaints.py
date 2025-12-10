from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models.complaint import Complaint
from app.schemas.complaint import ComplaintCreate, ComplaintResponse, ComplaintUpdate
import uuid
import os
from datetime import datetime

router = APIRouter(prefix="/api/complaints", tags=["complaints"])

# Create uploads directory if it doesn't exist
UPLOAD_DIR = "uploads/complaints"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/", response_model=ComplaintResponse)
async def create_complaint(
    name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    address: str = Form(...),
    complaint_type: str = Form(...),
    subject: str = Form(...),
    description: str = Form(...),
    file: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    try:
        # Generate unique reference ID
        reference_id = f"MMN-CMP-{datetime.now().strftime('%Y%m%d')}-{str(uuid.uuid4())[:8].upper()}"
        
        # Handle file upload if provided
        file_path = None
        file_name = None
        file_type = None
        
        if file:
            # Generate unique filename
            file_extension = os.path.splitext(file.filename)[1]
            unique_filename = f"{reference_id}_{file.filename}"
            file_path = os.path.join(UPLOAD_DIR, unique_filename)
            
            # Save file
            with open(file_path, "wb") as buffer:
                content = await file.read()
                buffer.write(content)
            
            file_name = file.filename
            file_type = file.content_type
        
        complaint_data = ComplaintCreate(
            name=name,
            email=email,
            phone=phone,
            address=address,
            complaint_type=complaint_type,
            subject=subject,
            description=description,
            file_name=file_name,
            file_type=file_type,
            file_path=file_path,
            reference_id=reference_id
        )
        
        complaint = Complaint(**complaint_data.dict())
        db.add(complaint)
        db.commit()
        db.refresh(complaint)
        
        return complaint
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/", response_model=List[ComplaintResponse])
def get_complaints(
    skip: int = 0,
    limit: int = 100,
    status: Optional[str] = None,
    complaint_type: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Complaint)
    
    if status:
        query = query.filter(Complaint.status == status)
    
    if complaint_type:
        query = query.filter(Complaint.complaint_type == complaint_type)
    
    complaints = query.order_by(Complaint.created_at.desc()).offset(skip).limit(limit).all()
    return complaints

@router.get("/{complaint_id}", response_model=ComplaintResponse)
def get_complaint(complaint_id: int, db: Session = Depends(get_db)):
    complaint = db.query(Complaint).filter(Complaint.id == complaint_id).first()
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")
    return complaint

@router.put("/{complaint_id}", response_model=ComplaintResponse)
def update_complaint(
    complaint_id: int,
    complaint_update: ComplaintUpdate,
    db: Session = Depends(get_db)
):
    complaint = db.query(Complaint).filter(Complaint.id == complaint_id).first()
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")
    
    update_data = complaint_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(complaint, field, value)
    
    db.commit()
    db.refresh(complaint)
    return complaint

@router.delete("/{complaint_id}")
def delete_complaint(complaint_id: int, db: Session = Depends(get_db)):
    complaint = db.query(Complaint).filter(Complaint.id == complaint_id).first()
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")
    
    # Delete associated file if exists
    if complaint.file_path and os.path.exists(complaint.file_path):
        os.remove(complaint.file_path)
    
    db.delete(complaint)
    db.commit()
    return {"message": "Complaint deleted successfully"}

@router.get("/stats/summary")
def get_complaint_stats(db: Session = Depends(get_db)):
    total_complaints = db.query(Complaint).count()
    pending_complaints = db.query(Complaint).filter(Complaint.status == 'pending').count()
    in_progress_complaints = db.query(Complaint).filter(Complaint.status == 'in_progress').count()
    resolved_complaints = db.query(Complaint).filter(Complaint.status == 'resolved').count()
    closed_complaints = db.query(Complaint).filter(Complaint.status == 'closed').count()
    
    return {
        "total_complaints": total_complaints,
        "pending_complaints": pending_complaints,
        "in_progress_complaints": in_progress_complaints,
        "resolved_complaints": resolved_complaints,
        "closed_complaints": closed_complaints
    }

@router.get("/types/list")
def get_complaint_types(db: Session = Depends(get_db)):
    types = db.query(Complaint.complaint_type).distinct().all()
    return [type[0] for type in types if type[0]]
