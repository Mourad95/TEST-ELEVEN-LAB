// Success Handlers
import { getPlanetListHandler } from "./planet.virtual-api";
import {
  getAstronautListHandler,
  deleteAstronautHandler,
  createAstronautHandler,
  getOneAstronautHandler,
  updateAstronautHandler,
} from "./astronaut.virtual-api";

export const handlers = [
  getPlanetListHandler,
  getAstronautListHandler,
  deleteAstronautHandler,
  createAstronautHandler,
  getOneAstronautHandler,
  updateAstronautHandler,
];
