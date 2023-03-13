/**
 * Get all posts
 * @param {string} sort_by Sort the assets
 * @returns {array}
 */
export async function getPosts() {
  let res = await axios.get("/api/posts");

  let data;

  data = res.data.data;

  return data;
}
