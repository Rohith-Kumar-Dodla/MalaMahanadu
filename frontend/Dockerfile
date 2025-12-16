# Stage 1: Build
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy build files
COPY dist /usr/share/nginx/html

# Copy custom MIME types
COPY mime.types /usr/share/nginx/html/mime.types

# Copy main nginx config (this replaces the default)
COPY nginx.conf /etc/nginx/nginx.conf

# Copy site config
COPY default.conf /etc/nginx/conf.d/default.conf

# Fix permissions
RUN chmod -R 755 /usr/share/nginx/html

