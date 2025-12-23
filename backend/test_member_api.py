#!/usr/bin/env python3
"""
Test specific member API endpoint to see what data is returned
"""

import requests
import json

def test_member_api():
    try:
        # Test member with ID 1
        response = requests.get("http://localhost:8000/api/membership/1")
        if response.status_code == 200:
            member = response.json()
            print("✓ API Response for member 1:")
            print(f"Name: {member.get('name')}")
            print(f"Membership ID: {member.get('membership_id')}")
            print(f"Photo URL: {member.get('photo_url')}")
            print(f"ID Card URL: {member.get('id_card_url')}")
            
            # Check if ID card URL is the new one with timestamp
            if member.get('id_card_url'):
                if 't=' in member.get('id_card_url'):
                    print("✓ ID Card URL has timestamp (new format)")
                else:
                    print("✗ ID Card URL missing timestamp (old format)")
            else:
                print("✗ No ID Card URL found")
                
        else:
            print(f"✗ API Error: {response.status_code}")
            print(response.text)
            
    except Exception as e:
        print(f"✗ Connection Error: {e}")

if __name__ == "__main__":
    test_member_api()
