export async function getEvents(params = {}) {
  let res = await axios.get("/api/events", {
    params: {
      limit: params.limit ? params.limit : null,
    },
  });

  return res.data.data;
}

export async function addEvent(data) {
  if (!data.title || !data.start_date) {
    return {
      message: "Fill title and start date",
      status: 500,
    };
  }

  let res = await axios.post("/api/event/add", {
    title: data.title,
    description: data.description ? data.description : null,
    start_date: data.start_date,
    end_date: data.end_date ? data.end_date : null,
  });

  return {
    message: "Event was added",
    status: 200,
  };
}
