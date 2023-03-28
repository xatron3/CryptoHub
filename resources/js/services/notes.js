/**
 * Add new note
 * @returns {array}
 */
export async function addNote(data) {
  let res = await axios.post("/api/notes/add", {
    title: data.title,
    description: data.description,
    content: data.content,
  });

  return res.data;
}

/**
 * Delete note
 * @param {int} id Event id
 * @returns
 */
export async function deleteNote(data) {
  let res = await axios.post("/api/notes/delete", {
    id: data.id,
  });

  return res.data;
}
