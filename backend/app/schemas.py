from pydantic import BaseModel


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

