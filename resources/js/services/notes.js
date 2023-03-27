/**
 * Get all posts
 * @param {string} sort_by Sort the assets
 * @returns {array}
 */
export async function addNote(data) {
  if (!data.title) {
    return {
      message: "Fill title",
      status: 500,
    };
  }

  let res = await axios.post("/api/notes/add", {
    title: data.title,
    content: data.content,
  });

  return {
    message: "Note was added",
    status: 200,
  };
}
