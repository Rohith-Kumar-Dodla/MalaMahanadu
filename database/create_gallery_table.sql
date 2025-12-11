-- Gallery Table for Mala Mahanadu
-- Stores metadata for gallery images and videos

-- Create gallery table
CREATE TABLE IF NOT EXISTS gallery (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    caption TEXT,
    type VARCHAR(10) NOT NULL CHECK (type IN ('image', 'video')),
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size BIGINT,
    mime_type VARCHAR(100),
    alt_text VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER REFERENCES admin_users(id),
    updated_by INTEGER REFERENCES admin_users(id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_gallery_type ON gallery(type);
CREATE INDEX IF NOT EXISTS idx_gallery_is_active ON gallery(is_active);
CREATE INDEX IF NOT EXISTS idx_gallery_display_order ON gallery(display_order);
CREATE INDEX IF NOT EXISTS idx_gallery_created_at ON gallery(created_at);
CREATE INDEX IF NOT EXISTS idx_gallery_created_by ON gallery(created_by);

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_gallery_updated_at 
    BEFORE UPDATE ON gallery 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create audit trigger for gallery
CREATE TRIGGER audit_gallery_trigger
    AFTER INSERT OR UPDATE OR DELETE ON gallery
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

-- Create view for active gallery items
CREATE OR REPLACE VIEW active_gallery AS
SELECT 
    id,
    title,
    caption,
    type,
    file_path as url,
    display_order,
    created_at
FROM gallery 
WHERE is_active = TRUE 
ORDER BY display_order ASC, created_at DESC;

-- Create view for gallery statistics
CREATE OR REPLACE VIEW gallery_statistics AS
SELECT 
    COUNT(*) as total_items,
    COUNT(CASE WHEN type = 'image' THEN 1 END) as total_images,
    COUNT(CASE WHEN type = 'video' THEN 1 END) as total_videos,
    COUNT(CASE WHEN is_active = TRUE THEN 1 END) as active_items,
    COUNT(CASE WHEN created_at >= CURRENT_DATE - INTERVAL '30 days' THEN 1 END) as new_items_last_30_days
FROM gallery;

-- Grant permissions (adjust as needed)
-- GRANT ALL PRIVILEGES ON gallery TO malamahanadu_user;
-- GRANT USAGE, SELECT ON SEQUENCE gallery_id_seq TO malamahanadu_user;
