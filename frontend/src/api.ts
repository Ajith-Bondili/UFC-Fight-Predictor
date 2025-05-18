const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";
export async function getFights() {
  const url = BACKEND_URL ? `${BACKEND_URL}/fights` : "/fights";
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch /fights");
  return await res.json();
}
