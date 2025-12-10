from PIL import Image, ImageDraw, ImageFont
import qrcode
import os
from datetime import datetime

def generate_id_card(membership_id: str, name: str, village: str, district: str, photo_path: str = None) -> str:
    """
    Generate ID card with Deep Blue (#0A1A3F), Gold (#F5C518), and White (#FFFFFF) theme
    """
    # ID Card dimensions (standard PVC card size)
    width, height = 1016, 638  # 3.375 x 2.125 inches at 300 DPI
    
    # Create new image with Deep Blue background
    img = Image.new('RGB', (width, height), '#0A1A3F')
    draw = ImageDraw.Draw(img)
    
    # Try to load fonts, fallback to default if not available
    try:
        title_font = ImageFont.truetype("arial.ttf", 48)
        subtitle_font = ImageFont.truetype("arial.ttf", 32)
        regular_font = ImageFont.truetype("arial.ttf", 24)
        small_font = ImageFont.truetype("arial.ttf", 18)
    except:
        title_font = ImageFont.load_default()
        subtitle_font = ImageFont.load_default()
        regular_font = ImageFont.load_default()
        small_font = ImageFont.load_default()
    
    # Add gold header
    header_height = 120
    draw.rectangle([0, 0, width, header_height], fill='#F5C518')
    
    # Add organization name
    draw.text((width//2, 30), "MALA MAHANADU", font=title_font, fill='#0A1A3F', anchor='mm')
    draw.text((width//2, 80), "MEMBERSHIP CARD", font=subtitle_font, fill='#0A1A3F', anchor='mm')
    
    # Add photo placeholder or actual photo
    photo_size = 200
    photo_x, photo_y = 50, 150
    
    if photo_path and os.path.exists(photo_path):
        try:
            photo = Image.open(photo_path)
            photo = photo.resize((photo_size, photo_size))
            img.paste(photo, (photo_x, photo_y))
        except:
            # Fallback to placeholder if photo loading fails
            draw.rectangle([photo_x, photo_y, photo_x + photo_size, photo_y + photo_size], 
                         fill='white', outline='#F5C518', width=3)
            draw.text((photo_x + photo_size//2, photo_y + photo_size//2), "PHOTO", 
                     font=regular_font, fill='#0A1A3F', anchor='mm')
    else:
        # Photo placeholder
        draw.rectangle([photo_x, photo_y, photo_x + photo_size, photo_y + photo_size], 
                     fill='white', outline='#F5C518', width=3)
        draw.text((photo_x + photo_size//2, photo_y + photo_size//2), "PHOTO", 
                 font=regular_font, fill='#0A1A3F', anchor='mm')
    
    # Add member details
    details_x = photo_x + photo_size + 50
    details_y = photo_y
    
    # Name
    draw.text((details_x, details_y), f"Name: {name}", font=regular_font, fill='white')
    details_y += 60
    
    # Membership ID
    draw.text((details_x, details_y), f"ID: {membership_id}", font=regular_font, fill='#F5C518')
    details_y += 60
    
    # Village
    draw.text((details_x, details_y), f"Village: {village}", font=regular_font, fill='white')
    details_y += 60
    
    # District
    draw.text((details_x, details_y), f"District: {district}", font=regular_font, fill='white')
    details_y += 60
    
    # Valid from date
    valid_from = datetime.now().strftime("%d-%m-%Y")
    draw.text((details_x, details_y), f"Valid From: {valid_from}", font=regular_font, fill='#F5C518')
    
    # Add QR Code (positioned above "Issued:" text)
    qr_size = 100
    qr_x = width - qr_size - 50
    qr_y = height - 140  # Positioned above the "Issued:" text
    
    # Create QR code with verification URL that links to the digital ID
    verification_url = f"https://malamahanadu.org/verify/{membership_id}"
    qr = qrcode.QRCode(version=1, box_size=10, border=2)
    qr.add_data(verification_url)
    qr.make(fit=True)
    qr_img = qr.make_image(fill_color='white', back_color='#0A1A3F')
    qr_img = qr_img.resize((qr_size, qr_size))
    img.paste(qr_img, (qr_x, qr_y))
    
    # Add "Scan to Verify" text
    draw.text((qr_x + qr_size//2, qr_y + qr_size + 8), "Scan to Verify", 
             font=small_font, fill='#F5C518', anchor='mm')
    
    # Add signature line (moved down to accommodate QR code)
    signature_y = height - 60
    draw.line([50, signature_y, 250, signature_y], fill='#F5C518', width=2)
    draw.text((50, signature_y + 10), "Authorized Signature", font=small_font, fill='white')
    
    # Add issue date (positioned below QR code)
    issue_date = datetime.now().strftime("%B %d, %Y")
    draw.text((qr_x + qr_size//2, signature_y + 15), f"Issued: {issue_date}", 
             font=small_font, fill='#F5C518', anchor='mm')
    
    # Create ID cards directory if it doesn't exist
    idcards_dir = "app/static/idcards"
    os.makedirs(idcards_dir, exist_ok=True)
    
    # Save the ID card
    filename = f"ID_{membership_id.replace('-', '_')}.png"
    filepath = os.path.join(idcards_dir, filename)
    img.save(filepath, 'PNG')
    
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
