export default async function handler(req, res) {
  const apiKey = process.env.GG_DEALS_API_KEY;
  // Perhatikan: endpoint ini khusus buat CEK HARGA satu game berdasarkan AppID
  // Kalau lo mau daftar list game, endpoint-nya BEDA lagi (biasanya /v1/game/list)
  const url = `https://api.gg.deals/v1/game/list?apiKey=${apiKey}&store=steam`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Gagal fetch data" });
  }
}
