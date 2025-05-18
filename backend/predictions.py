from elo_engine import UFCEloEngine, implied_prob
from typing import List, Tuple

def compute_metrics(
    engine: UFCEloEngine,
    fights: List[Tuple[str, str, int, int]],
):
    results = []
    for f1, f2, o1, o2 in fights:
        p1 = engine.win_prob(f1, f2)
        p2 = 1 - p1
        imp1 = implied_prob(o1)
        imp2 = implied_prob(o2)
        ev1 = p1 - imp1
        ev2 = p2 - imp2
        pred = 1 if p1 >= p2 else 2
        results.append({
            "fighter1": f1,
            "fighter2": f2,
            "odds1": o1,
            "odds2": o2,
            "eloProb1": p1,
            "eloProb2": p2,
            "impProb1": imp1,
            "impProb2": imp2,
            "ev1": ev1,
            "ev2": ev2,
            "predWinner": pred,
        })
    return results
