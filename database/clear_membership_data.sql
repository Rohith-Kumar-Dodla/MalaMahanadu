-- Drop all data from membership table
-- This will delete all member records but keep the table structure

-- First, drop audit logs related to members
DELETE FROM audit_logs WHERE table_name = 'members';

-- Then delete all records from members table
DELETE FROM members;

-- Reset the membership ID sequence to start from 1 again
ALTER SEQUENCE membership_id_sequence RESTART WITH 1;

-- Optional: Reset the auto-increment ID sequence for members table
ALTER SEQUENCE members_id_seq RESTART WITH 1;

-- Verify the data has been deleted
SELECT 'Members table cleared. Total members now: ' || COUNT(*) as result FROM members;

SELECT 'Membership ID sequence reset. Next ID will be: ' || nextval('membership_id_sequence') as next_id;
