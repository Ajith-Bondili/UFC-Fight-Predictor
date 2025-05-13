// src/App.tsx

import React from "react";

interface Fight {
  fighter1: string;
  fighter2: string;
  odds1: number;
  odds2: number;
  eloProb1: number;
}

const rawFights: Fight[] = [
  { fighter1: "Jack Della Maddalena", fighter2: "Belal Muhammad", odds1: 160, odds2: -192, eloProb1: 0.499 },
  { fighter1: "Valentina Shevchenko", fighter2: "Manon Fiorot", odds1: 114, odds2: -135, eloProb1: 0.460 },
  { fighter1: "José Aldo",             fighter2: "Aiemann Zahabi", odds1: -185, odds2: 154, eloProb1: 0.425 },
  { fighter1: "Alexa Grasso",          fighter2: "Natalia Silva", odds1: 195, odds2: -238, eloProb1: 0.411 },
  { fighter1: "Benoit Saint‑Denis",    fighter2: "Kyle Prepolec", odds1: -1500, odds2: 800, eloProb1: 0.561 },
  { fighter1: "Mike Malott",           fighter2: "Charles Radtke", odds1: -205, odds2: 170, eloProb1: 0.507 },
];

function impliedProb(o: number): number {
  return o > 0 ? 100 / (o + 100) : -o / (-o + 100);
}
function formatOdds(o: number): string {
  return o > 0 ? `+${o}` : `${o}`;
}

export default function App() {
  const fights = rawFights.map((f) => {
    const imp1 = impliedProb(f.odds1);
    const imp2 = impliedProb(f.odds2);
    const elop1 = f.eloProb1;
    const elop2 = 1 - f.eloProb1;
    const ev1   = elop1 - imp1;
    const ev2   = elop2 - imp2;
    const predWinner = elop1 >= elop2 ? 1 : 2;
    const isBenoitFight =
      f.fighter1 === "Benoit Saint‑Denis" && f.fighter2 === "Kyle Prepolec";

    return { ...f, imp1, imp2, elop2, ev1, ev2, predWinner, isBenoitFight };
  });

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>UFC 315 Predictions</h1>

      {fights.map((f, i) => (
        <div key={i} style={styles.row}>
          {/* Fighter 1 */}
          <div
            style={{
              ...styles.fighter,
              borderColor: f.isBenoitFight
                ? "#e74c3c"
                : f.ev1 > 0
                ? "#2ecc71"
                : "#e74c3c",
            }}
          >
            <h2 style={styles.name}>{f.fighter1}</h2>
            {f.predWinner === 1 && (
              <div style={styles.badge}>PREDICTED WINNER</div>
            )}
            <div style={styles.odds}>Odds: {formatOdds(f.odds1)}</div>
            <div style={styles.stats}>
              Elo: {(f.eloProb1 * 100).toFixed(1)}% | EV: {(f.ev1 * 100).toFixed(1)}%
            </div>
          </div>

          {/* VS */}
          <div style={styles.vs}>VS</div>

          {/* Fighter 2 */}
          <div
            style={{
              ...styles.fighter,
              borderColor: f.isBenoitFight
                ? "#e74c3c"
                : f.ev2 > 0
                ? "#2ecc71"
                : "#e74c3c",
            }}
          >
            <h2 style={styles.name}>{f.fighter2}</h2>
            {f.predWinner === 2 && (
              <div style={styles.badge}>PREDICTED WINNER</div>
            )}
            <div style={styles.odds}>Odds: {formatOdds(f.odds2)}</div>
            <div style={styles.stats}>
              Elo: {(f.elop2 * 100).toFixed(1)}% | EV: {(f.ev2 * 100).toFixed(1)}%
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: 900,
    margin: "0 auto",
    padding: 20,
    fontFamily: "system-ui, sans-serif",
  },
  header: {
    textAlign: "center",
    marginBottom: 24,
    fontSize: "1.5rem",
  },
  row: {
    display: "flex",
    alignItems: "stretch",
    marginBottom: 16,
  },
  fighter: {
    width: "45%",
    border: "2px solid",
    borderRadius: 8,
    padding: 12,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  name: {
    margin: "0 0 8px",
    fontSize: "1.1rem",
  },
  badge: {
    background: "#3498db",
    color: "#fff",
    padding: "4px 8px",
    borderRadius: 4,
    fontSize: "0.75rem",
    marginBottom: 8,
    alignSelf: "center",
  },
  odds: {
    fontSize: "0.9rem",
    margin: "8px 0",
  },
  stats: {
    fontSize: "0.85rem",
    color: "#555",
    marginBottom: 8,
  },
  vs: {
    width: "10%",
    textAlign: "center",
    fontSize: "1.2rem",
    fontWeight: "bold",
    alignSelf: "center",
  },
};
