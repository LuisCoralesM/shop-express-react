// Get response from API
export async function fetchApi(url, method, body) {
  try {
    const getResponse = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return {
      data: await getResponse.json(),
      ok: getResponse.ok,
    };
  } catch (error) {
    console.log(error);
  }
}
