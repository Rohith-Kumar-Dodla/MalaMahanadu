#!/usr/bin/env python3
"""
Check current member data to see if they have updated ID card URLs and photo URLs
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from sqlalchemy.orm import Session
from app.database import engine, get_db
from app.models.member import Member

def check_member_data():
    """Check member data for ID card and photo URLs"""
    db = Session(engine)
    
    try:
        members = db.query(Member).all()
        print(f"Found {len(members)} members:")
        
        for member in members:
            print(f"\n--- Member: {member.name} ---")
            print(f"ID: {member.id}")
            print(f"Membership ID: {member.membership_id}")
            print(f"Photo URL: {member.photo_url}")
            print(f"ID Card URL: {member.id_card_url}")
            print(f"Phone: {member.phone}")
            print(f"Village: {member.village}")
            print(f"District: {member.district}")
            print(f"State: {member.state}")
            
            # Check if photo file exists
            if member.photo_url:
                photo_path = member.photo_url.replace("/static/", "app/static/")
                if os.path.exists(photo_path):
                    print(f"✓ Photo file exists: {photo_path}")
                else:
                    print(f"✗ Photo file missing: {photo_path}")
            
            # Check if ID card file exists
            if member.id_card_url:
                idcard_path = member.id_card_url.split("?")[0].replace("/static/", "app/static/")
                if os.path.exists(idcard_path):
                    print(f"✓ ID Card file exists: {idcard_path}")
                else:
                    print(f"✗ ID Card file missing: {idcard_path}")
        
    except Exception as e:
        print(f"Error: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    check_member_data()
