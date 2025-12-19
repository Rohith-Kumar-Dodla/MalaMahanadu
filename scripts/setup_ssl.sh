#!/bin/bash

# SSL Certificate Setup Script for Mala Mahanadu
# This script sets up Let's Encrypt SSL certificates for malamahanadu.org

set -e

echo "Setting up SSL certificates for malamahanadu.org..."

# Check if Certbot is installed
if ! command -v certbot &> /dev/null; then
    echo "Installing Certbot..."
    sudo apt update
    sudo apt install -y certbot python3-certbot-nginx
fi

# Stop nginx to allow certbot to use port 80
echo "Stopping nginx..."
sudo systemctl stop nginx

# Obtain SSL certificate
echo "Obtaining SSL certificate..."
sudo certbot certonly --standalone \
    --email admin@malamahanadu.org \
    --agree-tos \
    --no-eff-email \
    -d malamahanadu.org \
    -d www.malamahanadu.org

# Set up automatic renewal
echo "Setting up automatic renewal..."
sudo crontab -l | { cat; echo "0 12 * * * /usr/bin/certbot renew --quiet"; } | sudo crontab -

# Test certificate renewal
echo "Testing certificate renewal..."
sudo certbot renew --dry-run

echo "SSL certificate setup completed!"
echo "Certificate files located at: /etc/letsencrypt/live/malamahanadu.org/"
echo ""
echo "Next steps:"
echo "1. Copy nginx/ssl-nginx.conf to /etc/nginx/sites-available/malamahanadu-ssl"
echo "2. Enable the site: sudo ln -s /etc/nginx/sites-available/malamahanadu-ssl /etc/nginx/sites-enabled/"
echo "3. Test nginx config: sudo nginx -t"
echo "4. Reload nginx: sudo systemctl reload nginx"
