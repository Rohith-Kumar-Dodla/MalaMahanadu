from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class GalleryBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    caption: Optional[str] = Field(None, max_length=1000)
    type: str = Field(...)
    alt_text: Optional[str] = Field(None, max_length=255)
    is_active: bool = True
    display_order: int = 0

class GalleryCreate(GalleryBase):
    file_name: str
    file_path: str
    file_size: Optional[int] = None
    mime_type: Optional[str] = None

class GalleryUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    caption: Optional[str] = Field(None, max_length=1000)
    alt_text: Optional[str] = Field(None, max_length=255)
    is_active: Optional[bool] = None
    display_order: Optional[int] = None

class GalleryResponse(GalleryBase):
    id: int
    file_name: str
    url: str
    file_size: Optional[int] = None
    mime_type: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    created_by: Optional[int] = None
    updated_by: Optional[int] = None

    class Config:
        from_attributes = True

class GalleryList(BaseModel):
    items: list[GalleryResponse]
    total: int
    page: int
    per_page: int
    total_pages: int

class GalleryStats(BaseModel):
    total_items: int
    total_images: int
    total_videos: int
    active_items: int
    new_items_last_30_days: int
