# --- Stage 1: Build frontend ---
FROM node:20-alpine as frontend-builder
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend .
RUN npm run build

# --- Stage 2: Build backend and copy frontend dist ---
FROM python:3.11-slim as backend
WORKDIR /app
RUN apt-get update && apt-get install -y \
    gcc libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install backend dependencies
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend .

# Copy built frontend to backend static directory
COPY --from=frontend-builder /frontend/dist ./app/static/dist

# Create static folders if not exist
RUN mkdir -p app/static/photos app/static/idcards

# Set permissions for static files
RUN chmod -R 755 app/static/dist || true
RUN find app/static/dist -type f -exec chmod 644 {} \; || true

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
