import pandas as pd
from elo_engine import UFCEloEngine

df = pd.read_csv("ufcfights.csv")

engine = UFCEloEngine()
engine.process_fights(df)