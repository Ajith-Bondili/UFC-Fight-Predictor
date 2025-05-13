import re
import pandas as pd
from elo_engine import UFCEloEngine

def extract_event_num(s: str) -> int:
    m = re.search(r'UFC\s*(\d+)', s, re.IGNORECASE)
    return int(m.group(1)) if m else 0

def main():
    df = pd.read_csv("ufcfights.csv")
    df["event_num"] = df["event"].apply(extract_event_num)

    train_df = df[df["event_num"] < 315]
    print(f"Training on {len(train_df)} fights (UFC < 315)")

    engine = UFCEloEngine()
    engine.process_fights(train_df)

    fights_315 = [
        ("Jack Della Maddalena", "Belal Muhammad"),
        ("Valentina Shevchenko",    "Manon Fiorot"),
        ("Aiemann Zahabi",               "José Aldo"),
        ("Natalia Silva",            "Alexa Grasso"),
        ("Benoit Saint‑Denis",      "Kyle Prepolec"),
        ("Mike Malott",             "Charles Radtke"),
    ]

    print("\nUFC 315 Elo Win Probabilities (P(fighter1 wins)):\n")
    for f1, f2 in fights_315:
        p = engine.win_prob(f1, f2)
        print(f"  {f1:<25} vs {f2:<25} → {p:.3f}")

if __name__ == "__main__":
    main()
