from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, status
from sqlalchemy.orm import Session
from typing import List, Optional
import os
import uuid
import shutil
from datetime import datetime

from app.database import get_db
from app.models.gallery import Gallery
from app.schemas.gallery import GalleryCreate, GalleryUpdate, GalleryResponse, GalleryList, GalleryStats
from app.utils.file_handler import save_upload_file, delete_file, get_file_size

router = APIRouter()

# Allowed file types
ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp", "image/svg+xml"]
ALLOWED_VIDEO_TYPES = ["video/mp4", "video/avi", "video/mov", "video/wmv", "video/flv", "video/quicktime"]
MAX_FILE_SIZE = 50 * 1024 * 1024  # 50MB

UPLOAD_DIR = "uploads/gallery"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.get("/", response_model=GalleryList)
async def get_gallery_items(
    skip: int = 0,
    limit: int = 50,
    type_filter: Optional[str] = None,
    active_only: bool = True,
    db: Session = Depends(get_db)
):
    """Get all gallery items with pagination and filtering"""
    query = db.query(Gallery)
    
    if active_only:
        query = query.filter(Gallery.is_active == True)
    
    if type_filter and type_filter in ["image", "video"]:
        query = query.filter(Gallery.type == type_filter)
    
    total = query.count()
    items = query.order_by(Gallery.display_order.asc(), Gallery.created_at.desc()).offset(skip).limit(limit).all()
    
    return GalleryList(
        items=[GalleryResponse.from_orm(item) for item in items],
        total=total,
        page=skip // limit + 1,
        per_page=limit,
        total_pages=(total + limit - 1) // limit
    )

@router.get("/stats", response_model=GalleryStats)
async def get_gallery_stats(db: Session = Depends(get_db)):
    """Get gallery statistics"""
    total_items = db.query(Gallery).count()
    total_images = db.query(Gallery).filter(Gallery.type == "image").count()
    total_videos = db.query(Gallery).filter(Gallery.type == "video").count()
    active_items = db.query(Gallery).filter(Gallery.is_active == True).count()
    
    # Items created in last 30 days
    from datetime import timedelta
    thirty_days_ago = datetime.utcnow() - timedelta(days=30)
    new_items_last_30_days = db.query(Gallery).filter(Gallery.created_at >= thirty_days_ago).count()
    
    return GalleryStats(
        total_items=total_items,
        total_images=total_images,
        total_videos=total_videos,
        active_items=active_items,
        new_items_last_30_days=new_items_last_30_days
    )

@router.get("/{item_id}", response_model=GalleryResponse)
async def get_gallery_item(item_id: int, db: Session = Depends(get_db)):
    """Get a specific gallery item by ID"""
    item = db.query(Gallery).filter(Gallery.id == item_id).first()
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Gallery item not found"
        )
    return GalleryResponse.from_orm(item)

@router.post("/", response_model=GalleryResponse)
async def upload_gallery_item(
    title: str = Form(...),
    caption: Optional[str] = Form(None),
    type: str = Form(...),
    alt_text: Optional[str] = Form(None),
    file: UploadFile = File(...),
    display_order: int = Form(0),
    db: Session = Depends(get_db)
):
    """Upload a new gallery item"""
    
    # Debug: Log file details
    print(f"Upload request - Type: {type}, File: {file.filename}, Content-Type: {file.content_type}")
    
    # Validate type manually
    if type not in ["image", "video"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Type must be either 'image' or 'video'"
        )
    
    # Validate file type - more flexible validation
    if type == "image":
        # Check if content type starts with "image/"
        if not file.content_type or not file.content_type.startswith("image/"):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid image file type. Content-Type received: {file.content_type}. Allowed types: {', '.join(ALLOWED_IMAGE_TYPES)}"
            )
        
        # Additional validation for specific image types
        if file.content_type not in ALLOWED_IMAGE_TYPES:
            # Allow any image type for now, but log it
            print(f"Allowing image type {file.content_type} even though not in strict allowed list")
    
    if type == "video":
        # Check if content type starts with "video/"
        if not file.content_type or not file.content_type.startswith("video/"):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid video file type. Content-Type received: {file.content_type}. Allowed types: {', '.join(ALLOWED_VIDEO_TYPES)}"
            )
    
    # Check file size
    file_content = await file.read()
    if len(file_content) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File size exceeds maximum limit of {MAX_FILE_SIZE // (1024*1024)}MB"
        )
    
    # Reset file pointer
    await file.seek(0)
    
    # Generate unique filename
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    
    # Save file
    file_path = os.path.join(UPLOAD_DIR, unique_filename)
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error saving file: {str(e)}"
        )
    
    # Create database record
    gallery_item = Gallery(
        title=title,
        caption=caption,
        type=type,
        file_name=file.filename,
        file_path=f"/static/gallery/{unique_filename}",
        file_size=len(file_content),
        mime_type=file.content_type,
        alt_text=alt_text,
        display_order=display_order,
        created_by=1  # TODO: Get from authenticated user
    )
    
    try:
        db.add(gallery_item)
        db.commit()
        db.refresh(gallery_item)
        return GalleryResponse.from_orm(gallery_item)
    except Exception as e:
        # Clean up uploaded file if database insert fails
        if os.path.exists(file_path):
            os.remove(file_path)
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error saving gallery item: {str(e)}"
        )

@router.put("/{item_id}", response_model=GalleryResponse)
async def update_gallery_item(
    item_id: int,
    item_update: GalleryUpdate,
    db: Session = Depends(get_db)
):
    """Update a gallery item"""
    item = db.query(Gallery).filter(Gallery.id == item_id).first()
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Gallery item not found"
        )
    
    # Update fields
    update_data = item_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(item, field, value)
    
    item.updated_by = 1  # TODO: Get from authenticated user
    
    try:
        db.commit()
        db.refresh(item)
        return GalleryResponse.from_orm(item)
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error updating gallery item: {str(e)}"
        )

@router.delete("/{item_id}")
async def delete_gallery_item(item_id: int, db: Session = Depends(get_db)):
    """Delete a gallery item"""
    item = db.query(Gallery).filter(Gallery.id == item_id).first()
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Gallery item not found"
        )
    
    # Delete file from filesystem
    if item.file_path:
        file_path = item.file_path.replace("/static/", UPLOAD_DIR + os.sep)
        if os.path.exists(file_path):
            try:
                os.remove(file_path)
            except Exception as e:
                # Log error but continue with database deletion
                print(f"Error deleting file: {e}")
    
    # Delete from database
    try:
        db.delete(item)
        db.commit()
        return {"message": "Gallery item deleted successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error deleting gallery item: {str(e)}"
        )

@router.patch("/{item_id}/toggle-active")
async def toggle_gallery_item_active(item_id: int, db: Session = Depends(get_db)):
    """Toggle active status of a gallery item"""
    item = db.query(Gallery).filter(Gallery.id == item_id).first()
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Gallery item not found"
        )
    
    item.is_active = not item.is_active
    item.updated_by = 1  # TODO: Get from authenticated user
    
    try:
        db.commit()
        db.refresh(item)
        return {"message": f"Gallery item {'activated' if item.is_active else 'deactivated'} successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error updating gallery item: {str(e)}"
        )
