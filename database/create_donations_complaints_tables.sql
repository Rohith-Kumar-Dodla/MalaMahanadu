-- Create donations table
CREATE TABLE IF NOT EXISTS donations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    transaction_id VARCHAR(255) NOT NULL,
    notes TEXT,
    donation_date TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'acknowledged')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE
);

-- Create complaints table
CREATE TABLE IF NOT EXISTS complaints (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    complaint_type VARCHAR(100) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    file_name VARCHAR(255),
    file_type VARCHAR(100),
    file_path VARCHAR(500),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'resolved', 'closed')),
    reference_id VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_donations_status ON donations(status);
CREATE INDEX IF NOT EXISTS idx_donations_created_at ON donations(created_at);
CREATE INDEX IF NOT EXISTS idx_donations_transaction_id ON donations(transaction_id);

CREATE INDEX IF NOT EXISTS idx_complaints_status ON complaints(status);
CREATE INDEX IF NOT EXISTS idx_complaints_created_at ON complaints(created_at);
CREATE INDEX IF NOT EXISTS idx_complaints_reference_id ON complaints(reference_id);
CREATE INDEX IF NOT EXISTS idx_complaints_type ON complaints(complaint_type);

-- Create trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_donations_updated_at 
    BEFORE UPDATE ON donations 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_complaints_updated_at 
    BEFORE UPDATE ON complaints 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for testing (optional)
INSERT INTO donations (name, email, phone, amount, payment_method, transaction_id, notes, donation_date, status) VALUES
('Rama Rao', 'rama@example.com', '9876543210', 5000.00, 'Bank Transfer', 'TXN123456', 'Donation for education', CURRENT_TIMESTAMP, 'pending'),
('Sita Devi', 'sita@example.com', '9876543211', 2500.00, 'UPI', 'UPI789012', 'General donation', CURRENT_TIMESTAMP, 'verified'),
('Lakshman', 'lakshman@example.com', '9876543212', 10000.00, 'Cash', 'CASH345678', 'Building fund', CURRENT_TIMESTAMP, 'acknowledged')
ON CONFLICT DO NOTHING;

INSERT INTO complaints (name, email, phone, address, complaint_type, subject, description, reference_id, status) VALUES
('Rama Rao', 'rama@example.com', '9876543210', 'Hyderabad, Telangana', 'Educational Issues', 'Scholarship Problem', 'Facing issues with scholarship application process', 'MMN-CMP-20250115-ABC12345', 'pending'),
('Sita Devi', 'sita@example.com', '9876543211', 'Warangal, Telangana', 'Employment Problems', 'Job Discrimination', 'Facing discrimination at workplace', 'MMN-CMP-20250115-DEF67890', 'in_progress'),
('Lakshman', 'lakshman@example.com', '9876543212', 'Karimnagar, Telangana', 'Healthcare Access', 'Medical Assistance', 'Need medical assistance for treatment', 'MMN-CMP-20250115-GHI11111', 'resolved')
ON CONFLICT (reference_id) DO NOTHING;
