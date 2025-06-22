import requests
import json
import os
from datetime import datetime, timedelta

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
        
        today = datetime.now().date()
        todays_events = [
            event for event in events 
            if datetime.fromisoformat(event['commence_time'].replace('Z', '+00:00')).date() == today 
            and event.get('sport_title', '').lower() == 'mma'
        ]
        
        if not todays_events:
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
                
                for bookmaker in odds_data.get('bookmakers', []):
                    for market in bookmaker.get('markets', []):
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
                    break
            except:
                continue
        
        if all_fights:
            card_file = 'data/card.json'
            os.makedirs('/data', exist_ok=True)
            with open(card_file, 'w') as f:
                json.dump(all_fights, f, indent=2)
        
    except:
        pass

if __name__ == "__main__":
    fetch_ufc_odds()
