#!/usr/bin/env python3
"""
Check what member IDs actually exist in database
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from sqlalchemy.orm import Session
from app.database import engine
from app.models.member import Member

def check_member_ids():
    """Check all member IDs in database"""
    db = Session(engine)
    
    try:
        members = db.query(Member).all()
        print(f"Found {len(members)} members:")
        
        for member in members:
            print(f"ID: {member.id}, Name: {member.name}, Membership ID: {member.membership_id}")
        
        print(f"\nTest API endpoints:")
        for member in members:
            url = f"http://localhost:8000/api/membership/{member.id}"
            print(f"Member {member.id}: {url}")
            
    except Exception as e:
        print(f"Error: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    check_member_ids()
