import json
import pandas as pd
from elo_engine import UFCEloEngine


class AppState:
    def __init__(self):
        self.engine = UFCEloEngine()
        self._load_elo()
        self.fights = self._load_card()

    def _load_elo(self) -> None:
        df = pd.read_csv("data/ufcfights.csv")
        self.engine.process_fights(df)

    def _load_card(self):
        with open("data/card.json") as f:
            raw = json.load(f)
        return [
            (bout["fighter1"], bout["fighter2"], bout["odds1"], bout["odds2"])
            for bout in raw
        ]


state = AppState()

