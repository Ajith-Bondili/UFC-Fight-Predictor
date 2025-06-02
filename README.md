# UFC Fights EV Predictor

A simple React + TypeScript frontend showing main UFC fight cards with sportsbook odds, alongside my Python Elo‑based win probabilities & expected value (EV) model. Positive‑EV fighters are highlighted in green; negative‑EV fighters in red. If both fighters have negative EV, both will be red. Screenshot below shows data from UFC 315.

If you use this to place your own bets, please do so at your own discretion.

<p align="center">
  <img src="./assets/ufc315_predictions.png" alt="UFC 315 Predictions UI" width="600"/>
</p>

## Features

- **Odds & implied probabilities** from UFC’s official site  
- **Elo model** built in Python 
- **Expected value (EV)** calculation & color‑coded borders  
- **“Predicted Winner”** badge under the fighter with Elo > 50%
- **Update Fight Data Weekly** with a GitHub Actions Workflow setup with the scraper

## Tech Stack

- **Frontend:** React, TypeScript, Vite 
- **Backend:** Python, FastAPI, GitHub Actions
- **Data:** UFC Stats scraping, Elo engine

## Getting Started

```bash
docker compose up --build

