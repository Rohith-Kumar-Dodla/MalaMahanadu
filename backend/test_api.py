#!/usr/bin/env python3
"""
Simple test to verify API endpoints are working
"""

import requests
import json

def test_members_api():
    try:
        response = requests.get("http://localhost:8000/api/membership/")
        if response.status_code == 200:
            members = response.json()
            print(f"✓ API working! Found {len(members)} members")
            for member in members:
                print(f"  - {member['name']} ({member['membership_id']}) - ID Card: {member.get('id_card_url', 'Not generated')}")
        else:
            print(f"✗ API Error: {response.status_code}")
    except Exception as e:
        print(f"✗ Connection Error: {e}")

if __name__ == "__main__":
    test_members_api()
