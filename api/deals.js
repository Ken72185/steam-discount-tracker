export default async function handler(req, res) {
  const apiKey = process.env.GG_DEALS_API_KEY;
  // Kita coba endpoint yang lebih enteng & stabil
  const url = `https://api.gg.deals/v1/deals/list?apiKey=${apiKey}&store=steam`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000); // Batasi 8 detik

    const response = await fetch(url, { signal: controller.signal });
    const data = await response.json();
    
    clearTimeout(timeout);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "GG.deals lagi sibuk atau API Key salah!" });
  }
}
