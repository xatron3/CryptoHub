export async function getAssets() {
  let res = await axios.get("/api/assets");

  return res.data;
}
