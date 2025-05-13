import { FightEvent, FightWithProb } from "./types";

const ODDS_API_KEY = import.meta.env.VITE_ODDS_API_KEY;
const BACKEND_URL   = import.meta.env.VITE_BACKEND_URL; // e.g. http://localhost:8000

/** 
 * Fetches the snapshot of last night’s UFC odds.
 * We take “yesterday” at 23:59 UTC so we get a complete card.
 */
async function fetchHistoricalOdds(): Promise<FightEvent[]> {
  // compute yesterday at 23:59:59Z
  const now = new Date();
  const y  = now.getUTCFullYear();
  const m  = String(now.getUTCMonth() + 1).padStart(2, "0");
  const d  = String(now.getUTCDate() - 1).padStart(2, "0");
  const isoDate = `${y}-${m}-${d}T23:59:59Z`;

  const url = new URL("/v4/historical/sports/mma_mixed_martial_arts/odds", "https://api.the-odds-api.com");
  url.searchParams.set("apiKey", ODDS_API_KEY);
  url.searchParams.set("regions", "us");
  url.searchParams.set("markets", "h2h");
  url.searchParams.set("oddsFormat", "decimal");
  url.searchParams.set("date", isoDate);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Failed to fetch historical odds: ${res.status}`);
  const json = await res.json();
  return json.data as FightEvent[];
}

/** 
 * Fetch your model’s probability that fighter1 beats fighter2
 */
async function fetchEloProb(f1: string, f2: string): Promise<number> {
  try {
    const res = await fetch(
      `${BACKEND_URL}/probability?f1=${encodeURIComponent(f1)}&f2=${encodeURIComponent(f2)}`
    );
    if (!res.ok) return 0;
    const { prob_f1_wins } = await res.json();
    return prob_f1_wins;
  } catch {
    return 0;
  }
}

/** Combines the two data sources */
export async function getLastNightFights(): Promise<FightWithProb[]> {
  const events = await fetchHistoricalOdds();
  return Promise.all(
    events.map(async (e) => ({
      ...e,
      eloProb: await fetchEloProb(e.teams[0], e.teams[1]),
    }))
  );
}
