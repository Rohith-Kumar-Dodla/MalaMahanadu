-- Add Aadhar card column to members table
-- Run this migration to update the existing database schema

ALTER TABLE members 
ADD COLUMN IF NOT EXISTS aadhar VARCHAR(12) UNIQUE NOT NULL;

-- Add index for better performance on Aadhar queries
CREATE INDEX IF NOT EXISTS idx_members_aadhar ON members(aadhar);

-- Add comment to the column
COMMENT ON COLUMN members.aadhar IS '12-digit Aadhar card number (unique identifier)';
