export default async function handler(req, res) {
  const apiKey = process.env.GG_DEALS_API_KEY;
  // Ini endpoint yang bener buat dapet daftar diskon
  const url = `https://api.gg.deals/v1/deals/list?apiKey=${apiKey}&store=steam`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Gagal ambil list game" });
  }
}
