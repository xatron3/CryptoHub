/**
 * updateCoingeckoPrice
 * @returns {array} result
 */
export async function updateCoingeckoPrice() {
  let res = await axios.post("/api/price/coingecko");

  return res;
}
