// Components
import { Perspective } from "../../../components/Perspective";
import {
  HUDPlanetList,
  PlanetForList,
} from "../../../components/HUDPlanetList";
import { HUDWindowLoader } from "../../../components/HUDWindowLoader";

// Context
import {
  usePlanetList,
  useCurrentPlanet,
  useSelectedPlanetForSpaceTravel,
} from "../../../contexts/SpaceTravelContext";
import { useMessageCenter } from "../../../contexts/MessageCenterContext";

// Types
import { Planet, NoWhere } from "../../../api/planet.api";

// Styles
import styles from "./PlanetSelectionContainer.module.css";

function mapPlanetListForHUDPlanetListComponent(
  planetList?: Planet[] | null,
  currentPlanet?: Planet | NoWhere,
  selectedPlanet?: Planet,
): PlanetForList[] {
  if (!planetList) {
    return [];
  }

  return planetList.map(({ id, name }: Planet) => ({
    id,
    name,
    isCurrent: currentPlanet === "NO_WHERE" ? false : currentPlanet?.id === id,
    isActive: selectedPlanet?.id === id,
  }));
}

export function PlanetSelectionContainer() {
  const {
    planetList: { isLoading, planetList, error },
  } = usePlanetList();
  const { currentPlanet } = useCurrentPlanet();
  const { selectedPlanetForSpaceTravel, setSelectedPlanetForSpaceTravel } =
    useSelectedPlanetForSpaceTravel();
  const { pushErrorMessage } = useMessageCenter();

  if (error) {
    pushErrorMessage("Eleven Labs space services are not online...");
    throw error;
  }

  const handleSelectPlanetForTravel = (
    selectedPlanet: Pick<PlanetForList, "id" | "name">,
  ) => {
    planetList?.forEach((planet: Planet) => {
      if (planet.id === selectedPlanet.id) {
        setSelectedPlanetForSpaceTravel(planet);
      }
    });
  };

  return (
    <Perspective
      value="900px"
      transform="rotateY(40deg)"
      className={styles.planetselectioncontainer}
    >
      {isLoading ? (
        <HUDWindowLoader
          name="planetlist-loader"
          label="planet list for travel"
          className="planetselectioncontainerLoader"
        />
      ) : (
        <HUDPlanetList
          planetList={mapPlanetListForHUDPlanetListComponent(
            planetList,
            currentPlanet,
            selectedPlanetForSpaceTravel,
          )}
          label="planet list for travel"
          onClick={handleSelectPlanetForTravel}
          emptyPlanetListMessage="Any planets available for travel"
        />
      )}
    </Perspective>
  );
}
