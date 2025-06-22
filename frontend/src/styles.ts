import React from "react";

export const styles: Record<string, React.CSSProperties> = {
  loading: { textAlign: "center", marginTop: 50, fontSize: "1.2rem" },
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