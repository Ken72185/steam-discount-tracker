// File: api/price.js (Vercel Serverless Function)
export default async function handler(req, res) {
  const { appid } = req.query;
  const url = `https://store.steampowered.com/api/appdetails?appids=${appid}&cc=id`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Gagal ambil harga dari Steam" });
  }
}
