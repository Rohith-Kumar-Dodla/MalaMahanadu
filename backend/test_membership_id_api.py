#!/usr/bin/env python3
"""
Test API with membership_id format
"""

import requests

def test_membership_id_api():
    try:
        # Test with actual membership_id
        membership_id = "MMN-2025-000001"
        response = requests.get(f"http://localhost:8000/api/membership/{membership_id}")
        
        if response.status_code == 200:
            member = response.json()
            print("✓ API Response with membership_id:")
            print(f"Name: {member.get('name')}")
            print(f"Membership ID: {member.get('membership_id')}")
            print(f"Photo URL: {member.get('photo_url')}")
            print(f"ID Card URL: {member.get('id_card_url')}")
            
            if member.get('id_card_url'):
                print(f"✓ ID Card URL: {member.get('id_card_url')}")
            else:
                print("✗ No ID Card URL found")
                
        else:
            print(f"✗ API Error: {response.status_code}")
            print(response.text)
            
    except Exception as e:
        print(f"✗ Connection Error: {e}")

if __name__ == "__main__":
    test_membership_id_api()
