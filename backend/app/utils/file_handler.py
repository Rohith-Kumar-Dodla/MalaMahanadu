import os
import uuid
import shutil
from typing import Optional

def save_upload_file(upload_file, destination_dir: str, filename: Optional[str] = None) -> str:
    """Save an uploaded file to the specified directory"""
    if filename is None:
        file_extension = os.path.splitext(upload_file.filename)[1]
        filename = f"{uuid.uuid4()}{file_extension}"
    
    file_path = os.path.join(destination_dir, filename)
    os.makedirs(destination_dir, exist_ok=True)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(upload_file.file, buffer)
    
    return filename

def delete_file(file_path: str) -> bool:
    """Delete a file from the filesystem"""
    try:
        if os.path.exists(file_path):
            os.remove(file_path)
            return True
        return False
    except Exception:
        return False

def get_file_size(file_path: str) -> Optional[int]:
    """Get the size of a file in bytes"""
    try:
        if os.path.exists(file_path):
            return os.path.getsize(file_path)
        return None
    except Exception:
        return None

def ensure_directory_exists(directory: str) -> None:
    """Ensure that a directory exists"""
    os.makedirs(directory, exist_ok=True)
