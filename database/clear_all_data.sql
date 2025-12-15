-- Complete Database Reset Script
-- This script clears all data from admin dashboard tables and resets sequences

-- Clear audit logs first (they reference the main tables)
DELETE FROM audit_logs WHERE table_name IN ('members', 'donations', 'complaints', 'gallery');

-- Clear all data from main tables
DELETE FROM donations;
DELETE FROM complaints;
DELETE FROM members;
DELETE FROM gallery;

-- Reset all sequences to start from 1
ALTER SEQUENCE IF EXISTS donations_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS complaints_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS members_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS gallery_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS membership_id_sequence RESTART WITH 1;

-- Verify the data has been cleared
SELECT 'Donations table cleared. Total donations now: ' || COUNT(*) as result FROM donations;
SELECT 'Complaints table cleared. Total complaints now: ' || COUNT(*) as result FROM complaints;
SELECT 'Members table cleared. Total members now: ' || COUNT(*) as result FROM members;
SELECT 'Gallery table cleared. Total gallery items now: ' || COUNT(*) as result FROM gallery;

SELECT 'All sequences reset. Next membership ID will be: ' || nextval('membership_id_sequence') as next_membership_id;
