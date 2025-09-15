# UFC Fights EV Predictor

A React + TypeScript frontend that displays UFC fight cards with sportsbook odds, alongside a Python Elo‑based probability and expected value (EV) model. Fighters with positive EV are emphasized; negative EV are de‑emphasized. Cards are fetched on a schedule and fight data is scraped weekly.

If you use this to place your own bets, please do so at your own discretion.

<p align="center">
  <img src="./assets/ufc315_predictions.png" alt="UFC Fights EV Predictor UI" width="600"/>
</p>

## Features

- **Compact card view** with odds and implied probabilities  
- **Elo model** in Python for win probability  
- **Expected value (EV)** computation with color emphasis  
- **Model Pick** badge for the preferred side  
- **Automated updates** via GitHub Actions for card and data

## Tech Stack

- **Frontend:** React, TypeScript, Vite  
- **Backend:** Python, FastAPI  
- **Data:** UFC stats scraping, Elo engine, odds API

## Getting Started

- Docker (recommended):
```bash
docker compose up --build
```

- Local dev (frontend only):
```bash
cd frontend
npm install
npm run dev
```

- Config:
  - Frontend reads `VITE_BACKEND_URL` (optional). If unset, it will call the same origin (use the dev proxy or set the env var).
  - Backend CORS allows localhost and can include a production domain via `FRONTEND_ORIGIN` env (see `backend/app/config.py`).

## Deployment

- Point your frontend to your backend by setting `VITE_BACKEND_URL` in your hosting provider’s env.
- Update backend CORS by setting `FRONTEND_ORIGIN` to your deployed frontend domain.
