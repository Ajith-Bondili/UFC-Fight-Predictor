export async function getFights() {
  const base = (import.meta as any)?.env?.VITE_BACKEND_URL || '';
  const url = `${base}/fights`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch /fights");
  return await res.json();
}