export interface OddsOutcome {
  name: string;
  price: number;
}

export interface Market {
  key: string;
  outcomes: OddsOutcome[];
}

export interface Bookmaker {
  key: string;
  title: string;
  markets: Market[];
}

export interface FightEvent {
  id: string;
  teams: [string, string];
  commence_time: string;
  bookmakers: Bookmaker[];
}

export interface FightWithProb extends FightEvent {
  eloProb: number;
}
