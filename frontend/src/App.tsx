import React, { useEffect, useState } from "react";
import { getFights } from "./api";
import type { FightOut } from "./types";
import { styles } from "./styles";

export default function App() {
  const [fights, setFights] = useState<FightOut[] | null>(null);

  useEffect(() => {
    getFights().then(setFights).catch(console.error);
  }, []);

  if (!fights) {
    return <div style={styles.loading}>Loading predictions…</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>UFC Predictions</h1>

      {fights.map((f, i) => {
        const imp1 = f.impProb1;
        const imp2 = f.impProb2;
        const elop1 = f.eloProb1;
        const elop2 = f.eloProb2;
        const ev1 = f.ev1;
        const ev2 = f.ev2;
        const pred1 = f.predWinner === 1;
        const pred2 = f.predWinner === 2;

        return (
          <div key={i} style={styles.row}>
            {/* Fighter 1 */}
            <div
              style={{
                ...styles.fighter,
                borderColor: ev1 > 0 ? "#2ecc71" : "#e74c3c",
              }}
            >
              <h2 style={styles.name}>{f.fighter1}</h2>
              {pred1 && <div style={styles.badge}>PREDICTED WINNER</div>}
              <div style={styles.odds}>
                Odds: {f.odds1 > 0 ? `+${f.odds1}` : f.odds1}
              </div>
              <div style={styles.stats}>
                Elo: {(elop1 * 100).toFixed(1)}% | EV: {(ev1 * 100).toFixed(1)}%
              </div>
            </div>

            {/* VS in the middle */}
            <div style={styles.vs}>VS</div>

            {/* Fighter 2 */}
            <div
              style={{
                ...styles.fighter,
                borderColor: ev2 > 0 ? "#2ecc71" : "#e74c3c",
              }}
            >
              <h2 style={styles.name}>{f.fighter2}</h2>
              {pred2 && <div style={styles.badge}>PREDICTED WINNER</div>}
              <div style={styles.odds}>
                Odds: {f.odds2 > 0 ? `+${f.odds2}` : f.odds2}
              </div>
              <div style={styles.stats}>
                Elo: {(elop2 * 100).toFixed(1)}% | EV: {(ev2 * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
