export default async function handler(req, res) {
  const { appId } = req.query;
  
  if (!appId) return res.status(400).json({ error: "App ID diperlukan" });

  // URL API Steam resmi untuk dapet harga per appID
  // cc=id biar dapet harga Rupiah
  const url = `https://store.steampowered.com/api/appdetails?appids=${appId}&cc=id&l=id&filters=price_overview`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    // Steam ngasih data dengan struktur: data[appId].data.price_overview
    const gameData = data[appId];

    if (gameData && gameData.success && gameData.data.price_overview) {
      res.status(200).json(gameData.data.price_overview);
    } else {
      res.status(200).json({ final_formatted: "Gratis / Tidak ada harga" });
    }
  } catch (error) {
    res.status(500).json({ error: "Gagal ambil harga dari Steam" });
  }
}
