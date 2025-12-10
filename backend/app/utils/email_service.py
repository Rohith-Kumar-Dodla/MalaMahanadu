import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
import os
from typing import Optional

class EmailService:
    def __init__(self):
        # Email configuration (use environment variables in production)
        self.smtp_server = os.getenv("SMTP_SERVER", "smtp.gmail.com")
        self.smtp_port = int(os.getenv("SMTP_PORT", "587"))
        self.smtp_username = os.getenv("SMTP_USERNAME", "your-email@gmail.com")
        self.smtp_password = os.getenv("SMTP_PASSWORD", "your-app-password")
        self.from_email = os.getenv("FROM_EMAIL", "membership@malamahanadu.org")
        self.from_name = os.getenv("FROM_NAME", "Mala Mahanadu")

    def create_welcome_email(self, name: str, membership_id: str) -> str:
        """Create welcome email HTML content"""
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Mala Mahanadu</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
            <div style="max-width: 600px; margin: 0 auto; background-color: white;">
                <!-- Header -->
                <div style="background-color: #0A1A3F; padding: 30px; text-align: center;">
                    <h1 style="color: #F5C518; margin: 0; font-size: 32px;">MALA MAHANADU</h1>
                    <p style="color: white; margin: 10px 0 0 0; font-size: 18px;">Community for Social Justice & Empowerment</p>
                </div>
                
                <!-- Welcome Message -->
                <div style="padding: 40px 30px;">
                    <h2 style="color: #0A1A3F; margin: 0 0 20px 0;">Welcome to Mala Mahanadu, {name}!</h2>
                    
                    <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">
                        Thank you for joining Mala Mahanadu! Your membership has been successfully registered, 
                        and we are excited to have you as part of our community.
                    </p>
                    
                    <!-- Membership Details -->
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #F5C518;">
                        <h3 style="color: #0A1A3F; margin: 0 0 15px 0;">Membership Details</h3>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 8px 0; color: #666; font-weight: bold;">Membership ID:</td>
                                <td style="padding: 8px 0; color: #0A1A3F; font-weight: bold; font-size: 18px;">{membership_id}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #666; font-weight: bold;">Member Name:</td>
                                <td style="padding: 8px 0; color: #333;">{name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #666; font-weight: bold;">Status:</td>
                                <td style="padding: 8px 0; color: #28a745; font-weight: bold;">Active</td>
                            </tr>
                        </table>
                    </div>
                    
                    <!-- Benefits -->
                    <h3 style="color: #0A1A3F; margin: 30px 0 15px 0;">Your Membership Benefits</h3>
                    <ul style="color: #333; line-height: 1.8; padding-left: 20px;">
                        <li>Access to community support networks</li>
                        <li>Leadership development opportunities</li>
                        <li>Participation in social justice initiatives</li>
                        <li>Community events and gatherings</li>
                        <li>Official Mala Mahanadu ID Card</li>
                    </ul>
                    
                    <!-- Important Information -->
                    <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 30px 0;">
                        <p style="color: #856404; margin: 0; font-size: 14px;">
                            <strong>Important:</strong> Please save your Membership ID for future reference. 
                            Your ID card is attached to this email.
                        </p>
                    </div>
                    
                    <!-- Contact Information -->
                    <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
                        <p style="color: #666; margin-bottom: 10px;">For any queries, contact us:</p>
                        <p style="color: #0A1A3F; margin: 5px 0;">Email: membership@malamahanadu.org</p>
                        <p style="color: #0A1A3F; margin: 5px 0;">Phone: +91 98765 43210</p>
                    </div>
                </div>
                
                <!-- Footer -->
                <div style="background-color: #0A1A3F; padding: 20px; text-align: center;">
                    <p style="color: #F5C518; margin: 0; font-size: 14px;">© 2025 Mala Mahanadu. All rights reserved.</p>
                    <p style="color: white; margin: 10px 0 0 0; font-size: 12px;">
                        Working towards social justice and community empowerment
                    </p>
                </div>
            </div>
        </body>
        </html>
        """
        return html_content

    async def send_membership_email(
        self, 
        email: str, 
        name: str, 
        membership_id: str, 
        id_card_path: Optional[str] = None
    ):
        """Send membership confirmation email with ID card attachment"""
        try:
            # Create message
            msg = MIMEMultipart('alternative')
            msg['Subject'] = f"Welcome to Mala Mahanadu - Membership ID: {membership_id}"
            msg['From'] = f"{self.from_name} <{self.from_email}>"
            msg['To'] = email

            # Add HTML content
            html_content = self.create_welcome_email(name, membership_id)
            html_part = MIMEText(html_content, 'html')
            msg.attach(html_part)

            # Add ID card attachment if provided
            if id_card_path and os.path.exists(id_card_path):
                with open(id_card_path, "rb") as attachment:
                    part = MIMEBase('application', 'octet-stream')
                    part.set_payload(attachment.read())
                
                encoders.encode_base64(part)
                part.add_header(
                    'Content-Disposition',
                    f'attachment; filename= "MalaMahanadu_ID_{membership_id}.png"'
                )
                msg.attach(part)

            # Send email
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls()
                server.login(self.smtp_username, self.smtp_password)
                server.send_message(msg)

            print(f"Email sent successfully to {email}")
            return True

        except Exception as e:
            print(f"Failed to send email: {str(e)}")
            return False

# Create global email service instance
email_service = EmailService()

# Export the async function for use in routes
async def send_membership_email(email: str, name: str, membership_id: str, id_card_path: str = None):
    """Async wrapper for email sending"""
    return email_service.send_membership_email(email, name, membership_id, id_card_path)
