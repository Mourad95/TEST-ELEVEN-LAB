// API Fetch
import { fetchApi } from "./fetch";

// Type
import { Planet } from "./planet.api";

export type Astronaut = {
  id: number;
  firstname: string;
  lastname: string;
  originPlanet: Planet;
};

export type GetAstronautListAPIResponse = Astronaut[];

export function getAstronautListFromAPI<GetAstronautListAPIResponse>(
  options?: RequestInit,
): Promise<GetAstronautListAPIResponse> {
  return fetchApi<GetAstronautListAPIResponse>("/astronauts", options);
}

type DeleteAstronautAPIResponse = {
  message: string;
};

export function deleteAstronautAPICall(astronautId: number) {
  return fetchApi<DeleteAstronautAPIResponse>(`/astronauts/${astronautId}`, {
    method: "DELETE",
  });
}

export async function getOneAstronautFromAPI<Astronaut>(
  astronautId?: string,
  options?: RequestInit,
): Promise<Astronaut | undefined> {
  if (!astronautId) {
    return;
  }

  return fetchApi<Astronaut>(`/astronauts/${astronautId}`, options);
}

export type CreateUpdateAstronautRequestBody = Pick<
  Astronaut,
  "firstname" | "lastname"
> & { originPlanetId: number };

export type CreateUpdateAstronautResponse = CreateUpdateAstronautRequestBody & {
  id: number;
};

export function createAstronautAPICall(
  astronautToCreate: CreateUpdateAstronautRequestBody,
): Promise<CreateUpdateAstronautResponse> {
  return fetchApi<CreateUpdateAstronautResponse>("/astronauts/", {
    method: "POST",
    body: JSON.stringify(astronautToCreate),
  });
}

export function updateAstronautAPICall(
  astronautId: string,
  astronautToUpdate: CreateUpdateAstronautRequestBody,
): Promise<CreateUpdateAstronautRequestBody> {
  return fetchApi<CreateUpdateAstronautResponse>(`/astronauts/${astronautId}`, {
    method: "PUT",
    body: JSON.stringify(astronautToUpdate),
  });
}
