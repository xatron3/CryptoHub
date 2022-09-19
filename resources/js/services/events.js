export async function getEvents(params = {}) {
  let passed, limit;

  if (params.passed !== undefined) {
    passed = params.passed;
  } else {
    passed = null;
  }

  let res = await axios.get("/api/events", {
    params: {
      limit: params.limit ? params.limit : null,
      passed: passed,
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

export async function deleteEvent(data) {
  if (!data.id) {
    return {
      message: "Need ID",
      status: 500,
    };
  }

  let res = await axios.post("/api/event/delete", {
    id: data.id,
  });

  return {
    message: "Event was deleted",
    status: 200,
  };
}
