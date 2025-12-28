FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    gcc libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY . .

# Copy frontend dist folder (already moved to backend)
# The dist folder is now in the backend directory, so it's included in COPY . .

RUN mkdir -p app/static/photos app/static/idcards

# Set proper permissions for static files
# RUN chmod -R 755 dist/
# RUN find dist/ -type f -exec chmod 644 {} \;

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
