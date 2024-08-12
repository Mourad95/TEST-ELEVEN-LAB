// Error
import { FetchError } from "../errors/FetchError";

export async function fetchApi<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const httpResponse = await fetch(
    `http://${import.meta.env.VITE_API_URL}${path}`,
    {
      ...options,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!httpResponse.ok) {
    throw new FetchError(
      httpResponse.status,
      httpResponse.statusText,
      `Error fetching server endpoint ${path}`,
    );
  }

  return (await httpResponse.json()) as T;
}
