-- Mala Mahanadu Membership Database Schema
-- PostgreSQL Database Creation Script

-- Create database (run this separately if needed)
-- CREATE DATABASE malamahanadu;

-- Connect to the database
-- \c malamahanadu;

-- Create members table
CREATE TABLE IF NOT EXISTS members (
    id SERIAL PRIMARY KEY,
    membership_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    father_name VARCHAR(255) NOT NULL,
    gender VARCHAR(10) NOT NULL CHECK (gender IN ('male', 'female', 'other')),
    dob DATE NOT NULL,
    caste VARCHAR(100) NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    state VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    mandal VARCHAR(100) NOT NULL,
    village VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    photo_url VARCHAR(500),
    id_card_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_members_membership_id ON members(membership_id);
CREATE INDEX IF NOT EXISTS idx_members_email ON members(email);
CREATE INDEX IF NOT EXISTS idx_members_phone ON members(phone);
CREATE INDEX IF NOT EXISTS idx_members_name ON members(name);
CREATE INDEX IF NOT EXISTS idx_members_state ON members(state);
CREATE INDEX IF NOT EXISTS idx_members_district ON members(district);
CREATE INDEX IF NOT EXISTS idx_members_created_at ON members(created_at);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_members_updated_at 
    BEFORE UPDATE ON members 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create sequence for membership IDs
CREATE SEQUENCE IF NOT EXISTS membership_id_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

-- Create function to generate membership IDs
CREATE OR REPLACE FUNCTION generate_membership_id()
RETURNS TEXT AS $$
DECLARE
    year_part TEXT;
    sequence_part TEXT;
BEGIN
    year_part := EXTRACT(YEAR FROM CURRENT_TIMESTAMP)::TEXT;
    sequence_part := LPAD(nextval('membership_id_sequence')::TEXT, 6, '0');
    RETURN 'MMN-' || year_part || '-' || sequence_part;
END;
$$ LANGUAGE plpgsql;

-- Create admin users table for authentication
CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for admin_users
CREATE INDEX IF NOT EXISTS idx_admin_users_username ON admin_users(username);
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);

-- Create trigger for admin_users updated_at
CREATE TRIGGER update_admin_users_updated_at 
    BEFORE UPDATE ON admin_users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert default admin user (password: admin123)
-- In production, use proper password hashing
INSERT INTO admin_users (username, password_hash, email, full_name) 
VALUES ('admin', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj3bp.Gm.F5e', 'admin@malamahanadu.org', 'System Administrator')
ON CONFLICT (username) DO NOTHING;

-- Create audit log table
CREATE TABLE IF NOT EXISTS audit_logs (
    id SERIAL PRIMARY KEY,
    table_name VARCHAR(50) NOT NULL,
    operation VARCHAR(10) NOT NULL CHECK (operation IN ('INSERT', 'UPDATE', 'DELETE')),
    record_id INTEGER NOT NULL,
    old_values JSONB,
    new_values JSONB,
    user_id INTEGER,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for audit_logs
CREATE INDEX IF NOT EXISTS idx_audit_logs_table_name ON audit_logs(table_name);
CREATE INDEX IF NOT EXISTS idx_audit_logs_operation ON audit_logs(operation);
CREATE INDEX IF NOT EXISTS idx_audit_logs_timestamp ON audit_logs(timestamp);

-- Create audit trigger function
CREATE OR REPLACE FUNCTION audit_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'DELETE' THEN
        INSERT INTO audit_logs (table_name, operation, record_id, old_values)
        VALUES (TG_TABLE_NAME, TG_OP, OLD.id, row_to_json(OLD));
        RETURN OLD;
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO audit_logs (table_name, operation, record_id, old_values, new_values)
        VALUES (TG_TABLE_NAME, TG_OP, NEW.id, row_to_json(OLD), row_to_json(NEW));
        RETURN NEW;
    ELSIF TG_OP = 'INSERT' THEN
        INSERT INTO audit_logs (table_name, operation, record_id, new_values)
        VALUES (TG_TABLE_NAME, TG_OP, NEW.id, row_to_json(NEW));
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create audit triggers
CREATE TRIGGER audit_members_trigger
    AFTER INSERT OR UPDATE OR DELETE ON members
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

-- Grant permissions (adjust as needed)
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO malamahanadu_user;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO malamahanadu_user;

-- Sample data for testing (optional)
-- INSERT INTO members (
--     membership_id, name, father_name, gender, dob, caste, phone, email, 
--     state, district, mandal, village, address
-- ) VALUES 
-- (
--     generate_membership_id(), 'Sample Member', 'Father Name', 'male', 
--     '1990-01-01', 'Mala', '9876543210', 'sample@example.com',
--     'Telangana', 'Hyderabad', 'Secunderabad', 'Hyderabad', 
--     'Sample address, Hyderabad, Telangana'
-- );

-- Create view for member statistics
CREATE OR REPLACE VIEW member_statistics AS
SELECT 
    COUNT(*) as total_members,
    COUNT(CASE WHEN gender = 'male' THEN 1 END) as male_members,
    COUNT(CASE WHEN gender = 'female' THEN 1 END) as female_members,
    COUNT(CASE WHEN gender = 'other' THEN 1 END) as other_members,
    COUNT(CASE WHEN created_at >= CURRENT_DATE - INTERVAL '30 days' THEN 1 END) as new_members_last_30_days,
    COUNT(CASE WHEN created_at >= CURRENT_DATE - INTERVAL '7 days' THEN 1 END) as new_members_last_7_days
FROM members;

-- Create view for state-wise distribution
CREATE OR REPLACE VIEW state_distribution AS
SELECT 
    state,
    COUNT(*) as member_count,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM members), 2) as percentage
FROM members
GROUP BY state
ORDER BY member_count DESC;

-- Create view for district-wise distribution
CREATE OR REPLACE VIEW district_distribution AS
SELECT 
    state,
    district,
    COUNT(*) as member_count,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM members), 2) as percentage
FROM members
GROUP BY state, district
ORDER BY member_count DESC;

-- Create view for monthly registration trends
CREATE OR REPLACE VIEW monthly_registrations AS
SELECT 
    DATE_TRUNC('month', created_at) as month,
    COUNT(*) as registrations,
    EXTRACT(YEAR FROM created_at) as year,
    EXTRACT(MONTH FROM created_at) as month_number
FROM members
GROUP BY DATE_TRUNC('month', created_at)
ORDER BY month DESC;
