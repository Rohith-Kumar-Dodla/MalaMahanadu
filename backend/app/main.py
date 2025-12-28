from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from app.routes import membership, donations, complaints, gallery
from app.database import engine
from app.models import member, donation, complaint, gallery as gallery_model, admin_user
import os

# Create all tables
member.Base.metadata.create_all(bind=engine)
donation.Base.metadata.create_all(bind=engine)
complaint.Base.metadata.create_all(bind=engine)
gallery_model.Base.metadata.create_all(bind=engine)
admin_user.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Mala Mahanadu Membership API",
    description="API for Mala Mahanadu membership management system",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000", 
        "https://deft-kheer-fd3d9b.netlify.app",
        "https://malamahanadu.org",
        "http://103.191.209.65",
        "https://103.191.209.65",
        os.getenv("FRONTEND_URL", "http://localhost:3000")
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Mount static files with CORS
from fastapi.staticfiles import StaticFiles
from fastapi.responses import Response
from fastapi import Request

class CORSSStaticFiles(StaticFiles):
    async def __call__(self, scope: dict, receive: dict, send: dict) -> None:
        async def send_wrapper(message):
            if message["type"] == "http.response.start":
                headers = list(message.get("headers", []))
                headers.extend([
                    (b"access-control-allow-origin", b"*"),
                    (b"access-control-allow-credentials", b"true"),
                    (b"access-control-allow-methods", b"*"),
                    (b"access-control-allow-headers", b"*"),
                ])
                message["headers"] = headers
            await send(message)
        
        await super().__call__(scope, receive, send_wrapper)

# Mount frontend static files
app.mount("/assets", CORSSStaticFiles(directory="app/static/dist/assets"), name="assets")
app.mount("/mock-images", CORSSStaticFiles(directory="app/static/dist/mock-images"), name="mock-images")

# Mount existing static files
app.mount("/static", CORSSStaticFiles(directory="uploads"), name="static")
app.mount("/static/photos", CORSSStaticFiles(directory="app/static/photos"), name="photos")

# Include routers
app.include_router(membership.router, prefix="/api/membership", tags=["membership"])
app.include_router(donations.router)
app.include_router(complaints.router)
app.include_router(gallery.router, prefix="/api/gallery", tags=["gallery"])

@app.get("/")
async def root():
    return FileResponse("app/static/dist/index.html", media_type="text/html")

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# SPA fallback - serve index.html for all non-API routes
@app.get("/{path:path}")
async def spa_fallback(path: str):
    # Don't intercept API routes or static files
    if path.startswith("api/") or path.startswith("static/") or path.startswith("assets/") or path.startswith("mock-images/"):
        raise HTTPException(status_code=404, detail="Not found")
    
    # For all other routes, serve the SPA index.html
    return FileResponse("app/static/dist/index.html", media_type="text/html")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
