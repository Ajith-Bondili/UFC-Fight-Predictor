export async function getFights() {
  const res = await fetch('https://fightev.onrender.com/fights');
  if (!res.ok) throw new Error("Failed to fetch /fights");
  return await res.json();
}