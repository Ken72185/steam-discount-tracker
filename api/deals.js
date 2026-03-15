export default async function handler(req, res) {
  const { appId } = req.query; // Ambil ID game dari frontend
  const apiKey = process.env.GG_DEALS_API_KEY;

  if (!appId) return res.status(400).json({ error: "App ID diperlukan" });

  // URL sesuai dokumentasi resmi GG.deals
  const url = `https://api.gg.deals/v1/prices/by-steam-app-id/${appId}?apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Gagal ambil data dari GG.deals" });
  }
}
