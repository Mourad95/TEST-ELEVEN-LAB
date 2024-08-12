// MSW
import { http, HttpResponse } from "msw";

// Mocked Planets
import { mockPlanetList } from "./planet.virtual-api";

// Types
import { Astronaut } from "../astronaut.api";

const mockAstronautList: Astronaut[] = [
  {
    id: 1,
    firstname: "Antoine",
    lastname: "A",
    originPlanet: mockPlanetList[0],
  },
  {
    id: 2,
    firstname: "Cam",
    lastname: "J",
    originPlanet: mockPlanetList[1],
  },
  {
    id: 3,
    firstname: "David",
    lastname: "D",
    originPlanet: mockPlanetList[2],
  },
  {
    id: 4,
    firstname: "Anakin",
    lastname: "S",
    originPlanet: mockPlanetList[3],
  },
];

export const getAstronautListHandler = http.get(
  `http://${import.meta.env.VITE_API_URL}/astronauts`,
  () => {
    return HttpResponse.json(mockAstronautList);
  },
);

export const getAstronautListErrorHandler = http.get(
  `http://${import.meta.env.VITE_API_URL}/astronauts`,
  () => {
    return new HttpResponse(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  },
);

export const deleteAstronautHandler = http.delete(
  `http://${import.meta.env.VITE_API_URL}/astronauts/:id`,
  () => {
    return HttpResponse.json({
      message: "Planet deleted successfully",
    });
  },
);

export const deleteAstronautErrorHandler = http.delete(
  `http://${import.meta.env.VITE_API_URL}/astronauts/:id`,
  () => {
    return new HttpResponse(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  },
);

export const getOneAstronautHandler = http.get(
  `http://${import.meta.env.VITE_API_URL}/astronauts/:id`,
  () => {
    return HttpResponse.json(mockAstronautList[1]);
  },
);

const mockCreatedUpdatedAstronaut = {
  id: 5,
  firsname: "John",
  lastname: "Doe",
  originPlanetId: mockPlanetList[1],
};

export const createAstronautHandler = http.post(
  `http://${import.meta.env.VITE_API_URL}/astronauts/`,
  () => {
    return HttpResponse.json(mockCreatedUpdatedAstronaut);
  },
);

export const updateAstronautHandler = http.put(
  `http://${import.meta.env.VITE_API_URL}/astronauts/:id`,
  () => {
    return HttpResponse.json({
      ...mockAstronautList[1],
      lastname: "Joe",
    });
  },
);
