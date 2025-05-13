import math
from collections import defaultdict
import pandas as pd

class UFCEloEngine:
    def __init__(
        self,
        initial_elo: float = 1000.0,
        base_k: float = 40.0,
        method_boost: float = 1.15,
    ):
        """
        initial_elo: starting rating for new fighters
        base_k: denominator for dynamic K (actual K = base_k / sqrt(bouts))
        method_boost: multiplier on K when method contains "KO" or "SUB"
        """
        self.initial_elo = initial_elo
        self.base_k = base_k
        self.method_boost = method_boost

        self.ratings = defaultdict(lambda: self.initial_elo)
        self.bouts = defaultdict(int)

    def _expected(self, ra: float, rb: float) -> float:
        return 1.0 / (1.0 + 10 ** ((rb - ra) / 400.0))

    def _k(self, fighter: str, method: str) -> float:
        # dynamic K that shrinks as bouts[fighter] grows
        k = self.base_k / math.sqrt(max(1, self.bouts[fighter]))
        m = method.upper()
        if "KO" in m or "SUB" in m:
            k *= self.method_boost
        return k

    def process_fights(self, df: pd.DataFrame):
        """
        Expects df with columns:
          - fighter_1, fighter_2
          - result: "win", "draw", or anything else (no-contest)
          - method: contains "KO"/"SUB" if applicable
        Processes rows in DataFrame order (chronology).
        """
        for row in df.itertuples(index=False):
            f1, f2 = row.fighter_1, row.fighter_2
            res = row.result.lower()
            method = getattr(row, "method", "")

            # ensure both fighters are in state
            _ = self.ratings[f1]
            _ = self.ratings[f2]

            ra, rb = self.ratings[f1], self.ratings[f2]
            ea = self._expected(ra, rb)
            eb = 1.0 - ea

            # actual scores
            if res == "win":
                sa, sb = 1.0, 0.0
            elif res == "draw":
                sa, sb = 0.5, 0.5
            else:  # no‑contest
                sa, sb = 0.0, 0.0

            # compute K
            k1 = self._k(f1, method)
            k2 = self._k(f2, method)

            # update ratings
            self.ratings[f1] = round(ra + k1 * (sa - ea), 2)
            self.ratings[f2] = round(rb + k2 * (sb - eb), 2)

            # bump bouts count
            self.bouts[f1] += 1
            self.bouts[f2] += 1

    def get_rating(self, fighter: str) -> float:
        return self.ratings[fighter]

    def win_prob(self, f1: str, f2: str) -> float:
        return self._expected(self.get_rating(f1), self.get_rating(f2))