#!/usr/bin/env python3
"""
Script to regenerate ID cards for all existing members with new QR code format
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from sqlalchemy.orm import Session
from app.database import engine, get_db
from app.models.member import Member
from app.utils.idcard_generator import generate_id_card
from datetime import datetime

def regenerate_all_idcards():
    """Regenerate ID cards for all members"""
    db = Session(engine)
    
    try:
        # Get all members
        members = db.query(Member).all()
        print(f"Found {len(members)} members")
        
        for member in members:
            print(f"Processing member: {member.name} ({member.membership_id})")
            
            try:
                # Get photo path if available
                photo_path = None
                if member.photo_url:
                    if member.photo_url.startswith("/static/photos/"):
                        photo_path = member.photo_url.replace("/static/", "app/static/")
                    else:
                        photo_path = member.photo_url
                
                # Generate new ID card with QR code
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
                
                print(f"✓ Successfully regenerated ID card for {member.name}")
                
            except Exception as e:
                print(f"✗ Error regenerating ID card for {member.name}: {e}")
                continue
        
        print(f"\n✓ ID card regeneration completed for {len(members)} members")
        
    except Exception as e:
        print(f"Database error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    regenerate_all_idcards()
