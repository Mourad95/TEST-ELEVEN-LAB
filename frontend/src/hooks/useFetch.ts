// React
import { useEffect, useState } from "react";

// Errors
import { FetchError } from "../errors/FetchError";

// API
interface FetchState<T> {
  data?: T | null;
  error?: FetchError | null;
  isLoading: boolean;
}

export function useFetch<T>(
  fetchFunction: (options?: RequestInit) => Promise<T | undefined>,
  options?: RequestInit,
): FetchState<T> {
  const initialState: FetchState<T> = {
    data: null,
    error: null,
    isLoading: false,
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    const fetchData = async () => {
      setState({
        data: null,
        error: null,
        isLoading: true,
      });

        const data = await fetchFunction(options);
        setState({
          data,
          error: null,
          isLoading: false,
        });
    };

    void fetchData();
  }, []);

  return state;
}
