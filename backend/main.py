import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import pandas as pd
import os

from elo_engine import UFCEloEngine
from predictions import compute_metrics

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://frontend:5173",
    "https://fightev-frontend.onrender.com",
    os.environ.get("FRONTEND_URL", "")
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin for origin in origins if origin],
    allow_methods=["GET"],
    allow_headers=["*"],
)

df = pd.read_csv("data/ufcfights.csv")
engine = UFCEloEngine()
engine.process_fights(df)

with open("data/card.json") as f:
    raw = json.load(f)
FIGHTS = [
    (bout["fighter1"], bout["fighter2"], bout["odds1"], bout["odds2"])
    for bout in raw
]

class FightOut(BaseModel):
    fighter1: str
    fighter2: str
    odds1: int
    odds2: int
    eloProb1: float
    eloProb2: float
    impProb1: float
    impProb2: float
    ev1: float
    ev2: float
    predWinner: int

@app.get("/fights", response_model=List[FightOut])
def get_fights():
    return compute_metrics(engine, FIGHTS)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=int(os.environ.get("PORT", "8000")), reload=True)
