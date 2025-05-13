import re
import pandas as pd
from elo_engine import UFCEloEngine

def extract_event_num(event_name: str) -> int:
    m = re.search(r'UFC\s*(\d+)', event_name, re.IGNORECASE)
    return int(m.group(1)) if m else 0

def main():
    df = pd.read_csv("ufcfights.csv")
    df["result"] = df["result"].str.lower()
    df["event_num"] = df["event"].apply(extract_event_num)

    train_df = df[df["event_num"] < 308]
    test_df = df[(df["event_num"] >= 308) & (df["event_num"] < 315)]
    print(f"Training fights (UFC < 308): {len(train_df)}")
    print(f" Testing fights (UFC >= 308): {len(test_df)}\n")

    counts = pd.concat([train_df["fighter_1"], train_df["fighter_2"]]).value_counts()

    def enough_bouts(row):
        return counts.get(row["fighter_1"], 0) >= 1 and counts.get(row["fighter_2"], 0) >= 5

    filtered_test = test_df[test_df.apply(enough_bouts, axis=1)]
    print(f"After filtering for ≥10 prior fights per fighter: {len(filtered_test)} test fights\n")

    engine = UFCEloEngine()
    engine.process_fights(train_df)

    records = []
    for _, row in filtered_test.iterrows():
        f1, f2 = row["fighter_1"], row["fighter_2"]
        actual = row["result"]
        if actual not in ("win", "loss"):
            continue

        prob = engine.win_prob(f1, f2)
        pred = "win" if prob > 0.5 else "loss"
        records.append({
            "event":     row["event"],
            "fighter_1": f1,
            "fighter_2": f2,
            "prob":      prob,
            "pred":      pred,
            "actual":    actual,
            "correct":   pred == actual
        })

    results = pd.DataFrame(records)
    if results.empty:
        print("No valid test fights after filtering.")
        return

    acc = results["correct"].mean()
    print(f"Tested {len(results)} fights (UFC ≥307).")
    print(f"Accuracy: {acc:.3%}\n")
    print(results[["event","fighter_1","fighter_2","prob","pred","actual","correct"]])

if __name__ == "__main__":
    main()
