// Libs
import { describe, it, vi, beforeEach, expect } from "vitest";

// fetch
import { fetchApi } from "../fetch";

// Errors
import { FetchError } from "../../errors/FetchError";

// @ts-expect-error: just mock what we need here, no complete fetch api options
const mockedFetch = (global.fetch = vi.fn());

type FakeAstronaut = {
  firstname: string;
  lastname: string;
  planetOfOrigin: string;
};

type FakeAstronautResponse = {
  astronauts: FakeAstronaut[];
};

const fakeData: FakeAstronautResponse = {
  astronauts: [
    {
      firstname: "Antoine",
      lastname: "A",
      planetOfOrigin: "Skizot",
    },
  ],
};

describe("fetch: module to fetch an api", () => {
  beforeEach(() => {
    mockedFetch.mockClear();
  });

  it("should return the data response when the request return ok", async () => {
    const mockedJson = vi.fn().mockResolvedValueOnce(fakeData);
    // @ts-expect-error: the fetch response is not complete, just return what we need
    mockedFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      statusText: "OK",
      json: mockedJson,
    });

    const astronauts = await fetchApi<FakeAstronautResponse>("/astronauts");

    expect(mockedFetch).toHaveBeenCalledWith(
      `http://${import.meta.env.VITE_API_URL}/astronauts`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      },
    );
    expect(mockedJson).toHaveBeenCalled();
    expect(astronauts).toEqual(fakeData);
  });

  it("should reject with a FetchError when the request return not ok", async () => {
    const mockedJson = vi.fn();
    // @ts-expect-error: the fetch response is not complete, just return what we need
    mockedFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "SERVER_ERROR",
      json: mockedJson,
    });

    await expect(() => fetchApi("/astronauts")).rejects.toThrow(FetchError);
    expect(mockedJson).not.toHaveBeenCalled();
  });
});
