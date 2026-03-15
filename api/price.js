export default async function handler(req, res) {
  const { appid } = req.query;
  const url = `https://store.steampowered.com/api/appdetails?appids=${appid}&cc=id`;
  const response = await fetch(url);
  const data = await response.json();
  res.status(200).json(data);
}
