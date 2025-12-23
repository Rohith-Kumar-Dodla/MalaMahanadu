-- Clear all member-related data from Mala Mahanadu PostgreSQL database
-- This script will remove:
-- 1. All member records
-- 2. Reset the sequence counter

-- Delete all member records from members table
DELETE FROM members;

-- Reset the sequence for the members table (PostgreSQL specific)
ALTER SEQUENCE members_id_seq RESTART WITH 1;

-- Verify the cleanup
SELECT 'All member data has been cleared successfully!' as message;
SELECT 'Members table count:' as info, COUNT(*) as count FROM members;
