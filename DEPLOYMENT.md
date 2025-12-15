# Mala Mahanadu - Digital Ocean Deployment Guide

## Project Overview
- **Frontend**: React + Vite + TailwindCSS
- **Backend**: FastAPI + PostgreSQL
- **Deployment**: Docker + Docker Compose

## Prerequisites
- Digital Ocean VPS (Ubuntu 20.04+ recommended)
- Docker & Docker Compose installed
- Domain name (optional)

## Quick Deployment Steps

### 1. Server Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Create project directory
sudo mkdir -p /opt/malamahanadu
cd /opt/malamahanadu
```

### 2. Deploy Application
```bash
# Clone your repository
git clone <your-repo-url> .

# Set environment variables
cp .env.production .env
# Edit .env with your actual credentials

# Build and start services
docker-compose -f docker-compose.prod.yml up -d

# Setup database
chmod +x scripts/setup_database.sh
./scripts/setup_database.sh
```

### 3. Clear Admin Data (Optional)
```bash
# Clear all members, donations, complaints
chmod +x scripts/clear_data.sh
./scripts/clear_data.sh
```

### 4. Configure Domain (malamahanadu.org)
```bash
# Install Nginx for reverse proxy
sudo apt install nginx -y

# Configure your domain in Nginx
# Point your domain A record to your VPS IP

# Create Nginx config for malamahanadu.org
sudo tee /etc/nginx/sites-available/malamahanadu << 'EOF'
server {
    listen 80;
    server_name malamahanadu.org www.malamahanadu.org;

    location / {
        proxy_pass http://localhost:80;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

# Enable site
sudo ln -s /etc/nginx/sites-available/malamahanadu /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

## Environment Variables
Update `.env` with:
- `DATABASE_URL`: PostgreSQL connection string
- `SMTP_*`: Email configuration  
- `FRONTEND_URL`: https://malamahanadu.org
- Admin credentials

## Services
- Frontend: Port 80 (Nginx)
- Backend: Port 8000 (FastAPI)
- Database: Port 5432 (PostgreSQL)

## Monitoring
```bash
# Check logs
docker-compose logs -f

# Check status
docker-compose ps

# Restart services
docker-compose restart
```

## Security Notes
- Change default passwords
- Use HTTPS in production
- Configure firewall
- Regular backups
