from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import universities, wizard, insights, scrape
from app.database import Base, engine

app = FastAPI(title="Tanzania University Explorer Backend (SekelaAPI)")

@app.on_event("startup")
def on_startup():
    # Create all tables
    Base.metadata.create_all(bind=engine)
# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://sekelafinder.netlify.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(universities.router)
app.include_router(wizard.router)
app.include_router(insights.router)
app.include_router(scrape.router)
