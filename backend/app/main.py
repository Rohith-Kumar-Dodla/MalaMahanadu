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
    allow_origins=["http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:5173", "https://deft-kheer-fd3d9b.netlify.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files
app.mount("/static", StaticFiles(directory="app/static"), name="static")
app.mount("/static/gallery", StaticFiles(directory="uploads/gallery"), name="gallery")

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
