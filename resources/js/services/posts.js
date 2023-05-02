/**
 * Add new note
 * @returns {array}
 */
export async function addPost(data) {
  let res = await axios.post("/api/post/add", {
    title: data.title,
    content: data.content,
    slug: data.slug,
  });

  return res.data;
}

/**
 * Get all posts
 * @param {string} sort_by Sort the assets
 * @returns {array}
 */
export async function getPosts() {
  let res = await axios.get("/api/posts");

  return res.data;
}

/**
 * Update post
 * @param {int} id Post id
 * @returns
 */
export async function updatePost(data) {
  let res = await axios.post("/api/post/update", data);

  return res.data;
}

/**
 * Delete post
 * @param {int} id Note id
 * @returns
 */
export async function deletePost(data) {
  let res = await axios.post("/api/post/delete", {
    id: data.id,
  });

  return res.data;
}
