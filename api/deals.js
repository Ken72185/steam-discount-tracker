export default async function handler(req, res) {
  const { appId } = req.query;
  const apiKey = process.env.GG_DEALS_API_KEY;

  try {
    // 1. Kalau user minta harga (ada appId), ambil dari Steam
    if (appId) {
      const steamRes = await fetch(`https://store.steampowered.com/api/appdetails?appids=${appId}&cc=id&l=id&filters=price_overview`);
      const steamData = await steamRes.json();
      const price = steamData[appId]?.data?.price_overview || { final_formatted: "N/A" };
      return res.status(200).json(price);
    } 
    
    // 2. Kalau user nggak minta appId, berarti minta daftar game diskon
    else {
      const ggRes = await fetch(`https://api.gg.deals/v1/deals/list?apiKey=${apiKey}&store=steam`);
      const ggData = await ggRes.json();
      return res.status(200).json(ggData);
    }
  } catch (error) {
    res.status(500).json({ error: "Gagal memproses request" });
  }
}
