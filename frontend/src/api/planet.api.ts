// API Fetch
import { fetchApi } from "./fetch";

// Types
import { AutoCompleteOptionType } from "../components/HUDAutoComplete";

type PlanetImage = {
  path: string;
  name: string;
};

export type Planet = {
  id: number;
  name: string;
  description: string;
  image: PlanetImage;
  isHabitable: boolean;
};

export type NoWhere = "NO_WHERE";

export type GetPlanetListAPIResponse = Planet[];

export function getPlanetListFromAPI<GetPlanetListAPIResponse>(
  options?: RequestInit,
): Promise<GetPlanetListAPIResponse> {
  return fetchApi<GetPlanetListAPIResponse>("/planets", options);
}

export async function getPlanetListByNameAPICall(
  searchTerm?: string,
  options?: RequestInit,
): Promise<AutoCompleteOptionType[]> {
  const requestUrl = searchTerm ? `/planets?name=${searchTerm}` : "/planets";

  const planetList = await fetchApi<GetPlanetListAPIResponse>(
    requestUrl,
    options,
  );

  return planetList.map(({ id, name }: Planet) => ({
    label: name,
    value: id.toString(),
  }));
}
