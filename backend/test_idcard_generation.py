#!/usr/bin/env python3
"""
Test ID card generation for one member to see if photos are included
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.utils.idcard_generator import generate_id_card

def test_idcard_generation():
    """Test ID card generation with actual member data"""
    
    # Test with first member's data
    membership_id = "MMN-2025-000001"
    name = "A"
    village = "ameerpet"
    district = "hyderabad"
    phone = "9876543211"
    state = "Telangana"
    photo_path = "app/static/photos/MMN-2025-000001_7fd58ff4.jpg"
    
    print(f"Testing ID card generation for: {name}")
    print(f"Photo path: {photo_path}")
    print(f"Photo exists: {os.path.exists(photo_path)}")
    
    try:
        result_path = generate_id_card(
            membership_id=membership_id,
            name=name,
            village=village,
            district=district,
            phone=phone,
            state=state,
            photo_path=photo_path
        )
        print(f"✓ ID card generated successfully: {result_path}")
        print(f"Generated file exists: {os.path.exists(result_path)}")
        
        # Show file size
        if os.path.exists(result_path):
            size = os.path.getsize(result_path)
            print(f"File size: {size} bytes")
        
    except Exception as e:
        print(f"✗ Error generating ID card: {e}")

if __name__ == "__main__":
    test_idcard_generation()
