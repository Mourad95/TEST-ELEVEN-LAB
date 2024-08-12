// React
import { createContext, useState, useContext, ReactNode } from "react";

// Error
import { FetchError } from "../errors/FetchError";
import { ContextError } from "../errors/ContextError";

// API
import { Planet, NoWhere } from "../api/planet.api";

type SpaceTravelContextType = {
  isTraveling: boolean;
  selectedPlanetForSpaceTravel?: Planet;
  currentPlanet: Planet | NoWhere;
  planetList: {
    isLoading: boolean;
    planetList?: Planet[] | null;
    error?: FetchError | null;
  };
  updateSpaceTravelContext: (
    stateToUpdate: Partial<SpaceTravelContextType>,
  ) => void;
};

const initialSpaceTravelContext: SpaceTravelContextType = {
  isTraveling: false,
  currentPlanet: "NO_WHERE",
  planetList: {
    isLoading: false,
  },
  updateSpaceTravelContext: () => {},
};

const SpaceTravelContext = createContext(initialSpaceTravelContext);

export function SpaceTravelProvider({ children }: { children: ReactNode }) {
  const [spaceTravelState, setSpaceTravelState] =
    useState<SpaceTravelContextType>(initialSpaceTravelContext);

  const updateSpaceTravelContext = (
    stateToUpdate: Partial<SpaceTravelContextType>,
  ) => {
    setSpaceTravelState((prevState) => ({
      ...prevState,
      ...stateToUpdate,
    }));
  };

  return (
    <SpaceTravelContext.Provider
      value={{
        ...spaceTravelState,
        updateSpaceTravelContext,
      }}
    >
      {children}
    </SpaceTravelContext.Provider>
  );
}

export function useSpaceTravelContext(): SpaceTravelContextType {
  const spaceTravelContext = useContext(SpaceTravelContext);

  if (!spaceTravelContext) {
    throw new ContextError(
      "SpaceTravelContext",
      "no SpaceTravelContext available, is the Provider was setted?",
    );
  }

  return spaceTravelContext;
}

export function useIsTraveling(): {
  isTraveling: SpaceTravelContextType["isTraveling"];
  setIsTraveling: (isTraveling: SpaceTravelContextType["isTraveling"]) => void;
} {
  const { isTraveling, updateSpaceTravelContext } = useSpaceTravelContext();

  return {
    isTraveling,
    setIsTraveling: (isTraveling: SpaceTravelContextType["isTraveling"]) =>
      updateSpaceTravelContext({ isTraveling }),
  };
}

export function useSelectedPlanetForSpaceTravel(): {
  selectedPlanetForSpaceTravel: SpaceTravelContextType["selectedPlanetForSpaceTravel"];
  setSelectedPlanetForSpaceTravel: (
    selectedPlanetForSpaceTravel: SpaceTravelContextType["selectedPlanetForSpaceTravel"],
  ) => void;
} {
  const { selectedPlanetForSpaceTravel, updateSpaceTravelContext } =
    useSpaceTravelContext();

  return {
    selectedPlanetForSpaceTravel,
    setSelectedPlanetForSpaceTravel: (
      selectedPlanetForSpaceTravel: SpaceTravelContextType["selectedPlanetForSpaceTravel"],
    ) => updateSpaceTravelContext({ selectedPlanetForSpaceTravel }),
  };
}

export function useCurrentPlanet(): {
  currentPlanet: SpaceTravelContextType["currentPlanet"];
  setCurrentPlanet: (
    currentPlanet: SpaceTravelContextType["currentPlanet"],
  ) => void;
} {
  const { currentPlanet, updateSpaceTravelContext } = useSpaceTravelContext();

  return {
    currentPlanet,
    setCurrentPlanet: (
      currentPlanet: SpaceTravelContextType["currentPlanet"],
    ) => updateSpaceTravelContext({ currentPlanet }),
  };
}

export function usePlanetList(): {
  planetList: SpaceTravelContextType["planetList"];
  setPlanetList: (planetList: SpaceTravelContextType["planetList"]) => void;
} {
  const { planetList, updateSpaceTravelContext } = useSpaceTravelContext();

  return {
    planetList,
    setPlanetList: (planetList: SpaceTravelContextType["planetList"]) =>
      updateSpaceTravelContext({ planetList }),
  };
}
