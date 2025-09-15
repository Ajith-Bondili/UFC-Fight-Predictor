import requests
from bs4 import BeautifulSoup
import pandas as pd
import time
import os

base_url = "http://ufcstats.com/statistics/events/completed?page="

def get_page_html(page: int) -> BeautifulSoup:
    resp = requests.get(f"{base_url}{page}")
    resp.raise_for_status()
    return BeautifulSoup(resp.content, "html.parser")

def main():
    csv_path = "backend/data/ufcfights.csv"
    cols = ["event","fighter_1","fighter_2","result","method","round","time"]

    if os.path.exists(csv_path):
        df_existing = pd.read_csv(csv_path, dtype=str)
        existing_set = set(df_existing[cols].itertuples(index=False, name=None))
    else:
        df_existing = pd.DataFrame(columns=cols)
        existing_set = set()

    new_rows = []
    page = 1

    while True:
        soup = get_page_html(page)
        links = soup.find_all("a", class_="b-link b-link_style_black")
        if not links:
            break

        for ev in links:
            event_name = ev.text.strip()
            event_url  = ev["href"]

            r = requests.get(event_url); r.raise_for_status()
            s = BeautifulSoup(r.content, "html.parser")
            table = s.find("tbody")
            if not table:
                continue

            for tr in table.find_all("tr"):
                cells = tr.find_all("td")
                if len(cells) < 7:
                    continue

                row = {
                    "event":     event_name,
                    "fighter_1": cells[1].find_all("p")[0].text.strip(),
                    "fighter_2": cells[1].find_all("p")[1].text.strip(),
                    "result":    cells[0].text.strip(),
                    "method":    cells[7].text.strip(),
                    "round":     cells[8].text.strip(),
                    "time":      cells[9].text.strip(),
                }

                key = tuple(row[c] for c in cols)
                if key not in existing_set:
                    existing_set.add(key)
                    new_rows.append(row)

            time.sleep(1)

        page += 1

    if new_rows:
        df_new = pd.DataFrame(new_rows, columns=cols)
        df_combined = pd.concat([df_new, df_existing], ignore_index=True)
        df_combined.to_csv(csv_path, index=False)
        print(f"Prepended {len(new_rows)} new fights to {csv_path}")
    else:
        print("No new fights to prepend.")

if __name__ == "__main__":
    main()
