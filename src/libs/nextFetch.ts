export const nextFetch = async (
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> => {
  const token = localStorage.getItem("token");
  const domain = "http://127.0.0.1:8787";
  return fetch(domain + input, {
    ...init,
    headers: {
      ...init?.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
};
