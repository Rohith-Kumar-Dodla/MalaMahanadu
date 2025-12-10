from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.routes import membership, donations, complaints
from app.database import engine
from app.models import member, donation, complaint

# Create all tables
member.Base.metadata.create_all(bind=engine)
donation.Base.metadata.create_all(bind=engine)
complaint.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Mala Mahanadu Membership API",
    description="API for Mala Mahanadu membership management system",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files
app.mount("/static", StaticFiles(directory="app/static"), name="static")

# Include routers
app.include_router(membership.router, prefix="/api/membership", tags=["membership"])
app.include_router(donations.router)
app.include_router(complaints.router)

@app.get("/")
async def root():
    return {"message": "Mala Mahanadu Membership API", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
