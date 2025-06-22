const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";
export async function getFights() {
  const res = await fetch(`${BACKEND_URL}/fights`);
  if (!res.ok) throw new Error("Failed to fetch /fights");
  return await res.json();
}
