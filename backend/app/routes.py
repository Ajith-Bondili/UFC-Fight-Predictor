from fastapi import APIRouter
from typing import List
from app.state import state
from app.schemas import FightOut
from predictions import compute_metrics


router = APIRouter()


@router.get("/fights", response_model=List[FightOut])
def get_fights():
    return compute_metrics(state.engine, state.fights)

