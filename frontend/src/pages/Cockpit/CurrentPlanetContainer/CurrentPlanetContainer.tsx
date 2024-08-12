// Components
import { HUDPlanetDescription } from "../../../components/HUDPlanetDescription";

// Context
import {
  useCurrentPlanet,
  useIsTraveling,
} from "../../../contexts/SpaceTravelContext";

// Styles
import styles from "./CurrentPlanetContainer.module.css";

export function CurrentPlanetContainer() {
  const { currentPlanet } = useCurrentPlanet();
  const { isTraveling } = useIsTraveling();

  if (currentPlanet === "NO_WHERE" || isTraveling) {
    return null;
  }

  const {
    image: { path: imagePath },
    name,
    description,
    isHabitable,
  } = currentPlanet;

  return (
    <HUDPlanetDescription
      label="Current Planet Information"
      className={styles.currentplanetcontainer}
      imgSrc={imagePath}
      name={name}
      description={description}
      isHabitable={isHabitable}
    />
  );
}
