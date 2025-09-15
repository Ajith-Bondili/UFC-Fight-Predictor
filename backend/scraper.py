import requests
from bs4 import BeautifulSoup
import pandas as pd
import time

base_url = "http://ufcstats.com/statistics/events/completed?page="

def get_page_html(page_number):
    url = base_url + str(page_number)
    response = requests.get(url)
    return BeautifulSoup(response.content, "html.parser")

all_events = []
page_number = 1
has_more_pages = True

while has_more_pages:
    soup = get_page_html(page_number)
    
    event_list = soup.find_all("a", class_="b-link b-link_style_black")
    if not event_list:
        has_more_pages = False
    else:
        for event in event_list:
            event_name = event.text.strip()
            event_url = event['href']
            all_events.append({"event_name": event_name, "event_url": event_url})
        
        page_number += 1
        time.sleep(1)

events_df = pd.DataFrame(all_events)

all_fights = []
for index, row in events_df.iterrows():
    event_name = row['event_name']
    event_url = row['event_url']
    
    event_response = requests.get(event_url)
    event_soup = BeautifulSoup(event_response.content, "html.parser")
    
    fight_table = event_soup.find("tbody")
    
    if fight_table:
        for fight_row in fight_table.find_all("tr"):
            fight_data = fight_row.find_all("td")
            
            if len(fight_data) >= 7:
                fight_details = {
                    "event": event_name,
                    "fighter_1": fight_data[1].find_all("p")[0].text.strip(),  # First fighter name
                    "fighter_2": fight_data[1].find_all("p")[1].text.strip(),  # Second fighter name
                    "result": fight_data[0].text.strip(),  # Win/Loss
                    "method": fight_data[7].text.strip(),  # Method of victory
                    "round": fight_data[8].text.strip(),  # Round number
                    "time": fight_data[9].text.strip()  # Time of fight
                }
                
                all_fights.append(fight_details)
    
    
    time.sleep(1)

all_fights_df = pd.DataFrame(all_fights)

all_fights_df.to_csv("ufcfights.csv", index=False)