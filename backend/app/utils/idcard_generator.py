from PIL import Image, ImageDraw, ImageFont
import qrcode
import os
from datetime import datetime

def generate_id_card(membership_id: str, name: str, village: str, district: str, phone: str, state: str, photo_path: str = None) -> str:
    """
    Generate professional ID card with enhanced Mala Mahanadu branding
    """
    # ID Card dimensions (credit card size)
    width, height = 1200, 750  # 4 x 2.5 inches at 300 DPI
    
    # Create new image with gradient background
    img = Image.new('RGB', (width, height), '#1a237e')
    draw = ImageDraw.Draw(img)
    
    # Try to load fonts, fallback to default if not available
    try:
        title_font = ImageFont.truetype("arial.ttf", 52)
        subtitle_font = ImageFont.truetype("arial.ttf", 36)
        regular_font = ImageFont.truetype("arial.ttf", 28)
        small_font = ImageFont.truetype("arial.ttf", 20)
        tiny_font = ImageFont.truetype("arial.ttf", 16)
    except:
        title_font = ImageFont.load_default()
        subtitle_font = ImageFont.load_default()
        regular_font = ImageFont.load_default()
        small_font = ImageFont.load_default()
        tiny_font = ImageFont.load_default()
    
    # Create gradient header background
    for i in range(150):
        color_value = 245 - (i * 0.5)
        color = f'#{int(color_value):02x}{int(color_value * 0.7):02x}18'
        draw.rectangle([0, i, width, i+1], fill=color)
    
    # Add decorative border
    border_width = 8
    draw.rectangle([border_width, border_width, width-border_width, height-border_width], 
                   fill=None, outline='#FFD700', width=border_width)
    
    # Add organization name and logo area
    draw.text((width//2, 40), "MALA MAHANADU", font=title_font, fill='#1a237e', anchor='mm')
    draw.text((width//2, 90), "OFFICIAL MEMBERSHIP CARD", font=subtitle_font, fill='#d32f2f', anchor='mm')
    
    # Add tagline
    draw.text((width//2, 130), "Empowering Community, Building Future", font=small_font, fill='#1a237e', anchor='mm')
    
    # Add photo placeholder or actual photo
    photo_size = 220
    photo_x, photo_y = 60, 180
    
    # Draw photo frame with shadow effect
    shadow_offset = 5
    draw.rectangle([photo_x + shadow_offset, photo_y + shadow_offset, photo_x + photo_size + shadow_offset, photo_y + photo_size + shadow_offset], 
                   fill='#666666', outline=None)
    draw.rectangle([photo_x, photo_y, photo_x + photo_size, photo_y + photo_size], 
                   fill='white', outline='#FFD700', width=4)
    
    if photo_path and os.path.exists(photo_path):
        try:
            photo = Image.open(photo_path)
            # Crop to square and resize
            min_dim = min(photo.size)
            left = (photo.size[0] - min_dim) // 2
            top = (photo.size[1] - min_dim) // 2
            photo = photo.crop((left, top, left + min_dim, top + min_dim))
            photo = photo.resize((photo_size, photo_size))
            img.paste(photo, (photo_x, photo_y))
        except Exception as e:
            print(f"Error loading photo: {e}")
            # Fallback to placeholder
            draw.text((photo_x + photo_size//2, photo_y + photo_size//2), "PHOTO", 
                     font=regular_font, fill='#1a237e', anchor='mm')
    else:
        # Photo placeholder with icon
        draw.text((photo_x + photo_size//2, photo_y + photo_size//2), "PHOTO", 
                 font=regular_font, fill='#1a237e', anchor='mm')
    
    # Add member details with better formatting
    details_x = photo_x + photo_size + 60
    details_y = photo_y + 10
    line_height = 40
    
    # Name with larger font
    draw.text((details_x, details_y), f"Name: {name}", font=regular_font, fill='white')
    details_y += line_height + 10
    
    # Membership ID with highlighting
    draw.text((details_x, details_y), f"Membership ID:", font=small_font, fill='#FFD700')
    details_y += 25
    draw.text((details_x + 20, details_y), f"{membership_id}", font=regular_font, fill='white', anchor='mm')
    details_y += line_height
    
    # Contact information
    draw.text((details_x, details_y), f"Phone: {phone}", font=regular_font, fill='white')
    details_y += line_height
    
    # Location information
    draw.text((details_x, details_y), f"Village: {village}", font=regular_font, fill='white')
    details_y += line_height
    
    draw.text((details_x, details_y), f"District: {district}", font=regular_font, fill='white')
    details_y += line_height
    
    draw.text((details_x, details_y), f"State: {state}", font=regular_font, fill='white')
    details_y += line_height + 10
    
    # Valid from date with styling
    valid_from = datetime.now().strftime("%d-%m-%Y")
    draw.text((details_x, details_y), f"Valid From: {valid_from}", font=small_font, fill='#FFD700')
    
    # Add QR Code with enhanced styling
    qr_size = 120
    qr_x = width - qr_size - 60
    qr_y = height - 180
    
    try:
        # Create QR code with verification URL
        verification_url = f"https://malamahanadu.org/api/membership/verify/{membership_id}"
        qr = qrcode.QRCode(version=1, box_size=8, border=3)
        qr.add_data(verification_url)
        qr.make(fit=True)
        qr_img = qr.make_image(fill_color='white', back_color='#1a237e')
        qr_img = qr_img.resize((qr_size, qr_size))
        
        # Add QR code background
        draw.rectangle([qr_x - 5, qr_y - 5, qr_x + qr_size + 5, qr_y + qr_size + 5], 
                       fill='white', outline='#FFD700', width=2)
        img.paste(qr_img, (qr_x, qr_y))
        
        # Add "Scan to Verify" text
        draw.text((qr_x + qr_size//2, qr_y + qr_size + 15), "Scan to Verify", 
                 font=tiny_font, fill='#FFD700', anchor='mm')
    except Exception as e:
        print(f"Error generating QR code: {e}")
    
    # Add signature section with better styling
    signature_y = height - 100
    signature_width = 200
    
    # Signature line with shadow
    draw.line([52, signature_y + 2, signature_width + 52, signature_y + 2], fill='#666666', width=3)
    draw.line([50, signature_y, signature_width + 50, signature_y], fill='#FFD700', width=2)
    draw.text((50 + signature_width//2, signature_y + 15), "Authorized Signature", 
             font=tiny_font, fill='white', anchor='mm')
    
    # Add issue date and card number
    issue_date = datetime.now().strftime("%B %d, %Y")
    draw.text((qr_x + qr_size//2, signature_y + 20), f"Issued: {issue_date}", 
             font=tiny_font, fill='#FFD700', anchor='mm')
    
    # Add card number at bottom
    card_number = f"CARD-{membership_id[-6:]}"
    draw.text((width//2, height - 25), card_number, 
             font=tiny_font, fill='white', anchor='mm')
    
    # Add watermark
    watermark_text = "MALA MAHANADU"
    draw.text((width - 80, height - 40), watermark_text, 
             font=tiny_font, fill='#666666', anchor='mm')
    
    # Create ID cards directory if it doesn't exist
    idcards_dir = "app/static/idcards"
    os.makedirs(idcards_dir, exist_ok=True)
    
    # Save the ID card with proper format settings
    filename = f"ID_{membership_id.replace('-', '_')}.png"
    filepath = os.path.join(idcards_dir, filename)
    
    # Ensure image is in RGB mode for maximum compatibility
    if img.mode != 'RGB':
        img = img.convert('RGB')
    
    # Save with high quality and proper PNG settings
    img.save(filepath, 'PNG', quality=95, optimize=True, dpi=(300, 300))
    
    # Also create PDF version
    try:
        from reportlab.lib.pagesizes import landscape, letter
        from reportlab.pdfgen import canvas
        from reportlab.lib.utils import ImageReader
        
        pdf_filename = f"ID_{membership_id.replace('-', '_')}.pdf"
        pdf_filepath = os.path.join(idcards_dir, pdf_filename)
        
        # Create landscape page size
        page_size = landscape((width, height))
        c = canvas.Canvas(pdf_filepath, pagesize=page_size)
        c.drawImage(ImageReader(filepath), 0, 0, width=width, height=height)
        c.save()
        
    except ImportError:
        print("ReportLab not installed, skipping PDF generation")
    
    return filepath
