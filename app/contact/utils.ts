export const httpRequest = async (
  url: string,
  requestHeaders: HeadersInit,
  method: string,
  body: BodyInit | null = null,
  id?: string // Making it explicitly optional with `?`
): Promise<any> => {
  // Adjust the return type based on what `data` can be
  url += id ? `/${id}` : "";

  // It's better to log headers as an object or use Headers.forEach
  console.log(
    "httpRequest requestHeaders",
    requestHeaders instanceof Headers
      ? [...requestHeaders.entries()]
      : requestHeaders
  );

  let request: RequestInit = {
    method: method,
    headers: requestHeaders,
    mode: "cors",
    credentials: "include",
    body: body,
  };

  try {
    const response = await fetch(url, request);
    // Similar to headers, convert response.headers to a loggable format if necessary
    console.log("httpRequest response, response.headers", response, [
      ...response.headers.entries(),
    ]);

    if (response.status === 204) return response;

    let data: any = undefined;
    const contentType = response.headers.get("Content-Type");

    if (contentType?.includes("application/json")) {
      data = await response.json();
    } else if (contentType?.includes("text")) {
      data = await response.text();
    }

    if (data?.errors) {
      let errorMessage = `error status ${data.errors[0].status} detail ${data.errors[0].detail}`;
      throw new Error(errorMessage); // Throwing an Error object instead of an array
    }

    return data?.data || data;
  } catch (error) {
    throw error;
  }
};
