import { useEffect, useState } from 'react';
import { getFights } from './api';
import { styles } from './styles';
import type { FightOut } from './types';

const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, ev: number): void => {
  if (ev !== 0) {
    e.currentTarget.style.boxShadow = 
      ev > 0 
        ? '0 0 10px 3px rgba(16, 185, 129, 0.4)' 
        : '0 0 10px 3px rgba(220, 38, 38, 0.4)';
  }
};

const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>, ev: number): void => {
  if (ev !== 0) {
    e.currentTarget.style.boxShadow = 
      ev > 0 
        ? '0 0 8px 2px rgba(16, 185, 129, 0.3)' 
        : '0 0 8px 2px rgba(220, 38, 38, 0.3)';
  }
};

export default function App() {
  const [fights, setFights] = useState<FightOut[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFights = async () => {
      try {
        const data = await getFights();
        setFights(data);
      } catch (err) {
        setError("Failed to load fights. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFights();
  }, []);

  if (loading) {
    return <div style={styles.loading}>Loading predictions...</div>;
  }

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  if (!fights || fights.length === 0) {
    return <div style={styles.loading}>No upcoming fights found.</div>;
  }

  // Group all fights together since we're not using dates
  const allFights = [...fights];

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>UFC Predictions</h1>

      <main>
        {allFights.map((fight, index) => {
              const ev1 = fight.ev1;
              const ev2 = fight.ev2;
              
              return (
                <article key={index} style={styles.row}>
                  <div
                    style={{
                      ...styles.fighter,
                      border: ev1 > 0 ? '2px solid #10b981' : ev1 < 0 ? '1px solid #dc2626' : '1px solid #e2e8f0',
                      boxShadow: ev1 > 0 
                        ? '0 0 10px 3px rgba(16, 185, 129, 0.4)' 
                        : ev1 < 0 
                          ? '0 0 8px 2px rgba(220, 38, 38, 0.3)'
                          : 'none',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => handleMouseEnter(e, ev1)}
                    onMouseLeave={(e) => handleMouseLeave(e, ev1)}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', position: 'relative', paddingTop: '8px' }}>
                      {fight.predWinner === 1 && (
                        <div style={styles.badge}>Predicted Winner</div>
                      )}
                      <h3 style={{ ...styles.name, margin: '0.5rem 0 0', textAlign: 'center' }}>{fight.fighter1}</h3>
                      <div style={{ ...styles.odds, margin: '0.5rem 0' }}>
                        {fight.odds1 > 0 ? `+${fight.odds1}` : fight.odds1}
                      </div>
                      <div style={{...styles.stats, color: '#1f2937', textAlign: 'center'}}>
                        <div>Elo: <span style={{color: '#111827', fontWeight: '500'}}>{(fight.eloProb1 * 100).toFixed(1)}%</span></div>
                        <div>EV: <span style={{ color: ev1 > 0 ? '#10b981' : '#dc2626', fontWeight: '500' }}>
                          {ev1 > 0 ? '+' : ''}{(ev1 * 100).toFixed(1)}%
                        </span></div>
                      </div>
                    </div>
                  </div>

                  <div style={styles.vs}>vs</div>

                  <div
                    style={{
                      ...styles.fighter,
                      border: ev2 > 0 ? '2px solid #10b981' : ev2 < 0 ? '1px solid #dc2626' : '1px solid #e2e8f0',
                      boxShadow: ev2 > 0 
                        ? '0 0 10px 3px rgba(16, 185, 129, 0.4)' 
                        : ev2 < 0 
                          ? '0 0 8px 2px rgba(220, 38, 38, 0.3)'
                          : 'none',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (ev2 !== 0) {
                        e.currentTarget.style.boxShadow = 
                          ev2 > 0 
                            ? '0 0 12px 4px rgba(16, 185, 129, 0.5)' 
                            : '0 0 10px 3px rgba(220, 38, 38, 0.4)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (ev2 !== 0) {
                        e.currentTarget.style.boxShadow = 
                          ev2 > 0 
                            ? '0 0 8px 2px rgba(16, 185, 129, 0.3)' 
                            : '0 0 8px 2px rgba(220, 38, 38, 0.3)';
                      }
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', position: 'relative', paddingTop: '8px' }}>
                      {fight.predWinner === 2 && (
                        <div style={styles.badge}>Predicted Winner</div>
                      )}
                      <h3 style={{ ...styles.name, margin: '0.5rem 0 0', textAlign: 'center' }}>{fight.fighter2}</h3>
                      <div style={{ ...styles.odds, margin: '0.5rem 0' }}>
                        {fight.odds2 > 0 ? `+${fight.odds2}` : fight.odds2}
                      </div>
                      <div style={{...styles.stats, color: '#1f2937', textAlign: 'center'}}>
                        <div>Elo: <span style={{color: '#111827', fontWeight: '500'}}>{(fight.eloProb2 * 100).toFixed(1)}%</span></div>
                        <div>EV: <span style={{ color: ev2 > 0 ? '#10b981' : '#dc2626', fontWeight: '500' }}>
                          {ev2 > 0 ? '+' : ''}{(ev2 * 100).toFixed(1)}%
                        </span></div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
      </main>
    </div>
  );
}
