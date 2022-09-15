export async function getEvents() {
  let res = await axios.get("/api/events");

  return res.data.data;
}
