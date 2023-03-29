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
 * @param {int} id Note id
 * @returns
 */
export async function deleteNote(data) {
  let res = await axios.post("/api/notes/delete", {
    id: data.id,
  });

  return res.data;
}

/**
 * Update note
 * @param {int} id Note id
 * @returns
 */
export async function updateNote(data) {
  let res = await axios.post("/api/notes/update", {
    id: data.id,
    title: data.title ? data.title : null,
    description: data.description ? data.description : null,
    content: data.content ? data.content : null,
  });

  return res.data;
}
