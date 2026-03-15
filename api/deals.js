export default async function handler(req, res) {
  const url = `https://api.gg.deals/v1/deals/list?apiKey=${process.env.GG_DEALS_API_KEY}&store=steam`;
  const response = await fetch(url);
  const data = await response.json();
  res.status(200).json(data);
}
