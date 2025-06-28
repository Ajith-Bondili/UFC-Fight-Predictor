import requests
import json
import os
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("ODDS_API_KEY")

def fetch_ufc_odds():
    
    if not API_KEY:
        print("API key not set. Please set the ODDS_API_KEY environment variable.")
        return
    
    base_url = "https://api.the-odds-api.com/v4"
    sport = "mma_mixed_martial_arts"
    
    try:
        events_url = f"{base_url}/sports/{sport}/events"
        
        params = {
            'apiKey': API_KEY,
            'dateFormat': 'iso',
            'commenceTimeFrom': datetime.now().strftime('%Y-%m-%dT%H:%M:%SZ'),
            'commenceTimeTo': (datetime.now() + timedelta(days=30)).strftime('%Y-%m-%dT%H:%M:%SZ')
        }
        
        response = requests.get(events_url, params=params)
        response.raise_for_status()
        events = response.json()
        
        print(f"Found {len(events)} total events")
        
        today = datetime.now().date()
        
        todays_events = []
        for event in events:
            event_date = datetime.fromisoformat(event['commence_time'].replace('Z', '+00:00')).date()
            event_title = event.get('sport_title', '').lower()
            
            days_diff = (event_date - today).days
            if 0 <= days_diff <= 3 and event_title == 'mma':
                todays_events.append(event)
        
        print(f"Found {len(todays_events)} MMA events in next 3 days")
        
        if not todays_events:
            print("No MMA events found in next 3 days")
            return
        
        all_fights = []
        for event in todays_events:
            odds_url = f"{base_url}/sports/{sport}/events/{event['id']}/odds"
            odds_params = {
                'apiKey': API_KEY,
                'regions': 'us',
                'markets': 'h2h',
                'oddsFormat': 'american'
            }
            
            try:
                odds_response = requests.get(odds_url, params=odds_params)
                odds_response.raise_for_status()
                odds_data = odds_response.json()
                
                fanduel_bookmaker = None
                for bookmaker in odds_data.get('bookmakers', []):
                    if bookmaker.get('key') == 'fanduel' or bookmaker.get('title', '').lower() == 'fanduel':
                        fanduel_bookmaker = bookmaker
                        break
                
                if fanduel_bookmaker:
                    for market in fanduel_bookmaker.get('markets', []):
                        if market['key'] == 'h2h' and len(market['outcomes']) >= 2:
                            outcomes = market['outcomes']
                            if len(outcomes) >= 2:
                                fight = {
                                    "fighter1": outcomes[0]['name'],
                                    "fighter2": outcomes[1]['name'],
                                    "odds1": outcomes[0]['price'],
                                    "odds2": outcomes[1]['price']
                                }
                                all_fights.insert(0, fight)
                    
            except Exception as e:
                continue
        
        print(f"Collected {len(all_fights)} fights")
        
        if all_fights:
            card_file = 'data/card.json'
            os.makedirs('data', exist_ok=True)
            with open(card_file, 'w') as f:
                json.dump(all_fights, f, indent=2)
            print("Card updated")
        
    except Exception as e:
        print(f"Error in main try block: {e}")
        
if __name__ == "__main__":
    fetch_ufc_odds()
