from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.routes import membership, donations, complaints, gallery
from app.database import engine
from app.models import member, donation, complaint, gallery as gallery_model, admin_user

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
    allow_origins=["*"],  # Allow all origins for development, can be restricted later
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

app.mount("/static", CORSSStaticFiles(directory="app/static"), name="static")
app.mount("/static/gallery", CORSSStaticFiles(directory="uploads/gallery"), name="gallery")
app.mount("/static/photos", CORSSStaticFiles(directory="app/static/photos"), name="photos")

# Include routers
app.include_router(membership.router, prefix="/api/membership", tags=["membership"])
app.include_router(donations.router)
app.include_router(complaints.router)
app.include_router(gallery.router, prefix="/api/gallery", tags=["gallery"])

@app.get("/")
async def root():
    return {"message": "Mala Mahanadu Membership API", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
