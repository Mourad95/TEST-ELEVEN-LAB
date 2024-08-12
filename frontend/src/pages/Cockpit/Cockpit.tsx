// React
import { useEffect } from "react";

// Libs
import { useNavigate } from "react-router-dom";

// Components
import { Space } from "../../components/Space";
import { Flexbox } from "../../components/Flexbox";
import { HUDButton } from "../../components/HUDButton";
import { Perspective } from "../../components/Perspective";
import { PlanetListErrorBoundary } from "./PlanetListErrorBoundary";

// Containers
import { PlanetSelectionContainer } from "./PlanetSelectionContainer";
import { CurrentPlanetContainer } from "./CurrentPlanetContainer";
import { TravelContainer } from "./TravelContainer";

// Hooks
import { useFetch } from "../../hooks/useFetch";

// Context
import {
  usePlanetList,
  useIsTraveling,
} from "../../contexts/SpaceTravelContext";

// API
import {
  getPlanetListFromAPI,
  GetPlanetListAPIResponse,
} from "../../api/planet.api";

// SVG
import IconSpaceship from "../../assets/icon-spaceship.svg?react";

// Styles
import styles from "./Cockpit.module.css";

export function Cockpit() {
  const navigate = useNavigate();
  const handleNaviageToSpaceshipAdminPage = () => navigate("/spaceship-admin");

  const { isLoading, data, error } =
    useFetch<GetPlanetListAPIResponse>(getPlanetListFromAPI);
  const { setPlanetList } = usePlanetList();

  useEffect(() => {
    setPlanetList({ isLoading, planetList: data, error });
  }, [data, error, isLoading]);

  const { isTraveling } = useIsTraveling();

  return (
    <Flexbox className={styles.cockpit} flexDirection="column">
      <Space isHyperSpace={isTraveling} className={styles.cockpitSpace} />
      <Flexbox
        flex="1 1 auto"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <div className={styles.cockpitElevenLabsLogo}>Eleven Labs</div>
        <Perspective
          value="900px"
          transform="rotateY(-40deg)"
          className={styles.cockpitSpaceshipAdminButtonContainer}
        >
          <HUDButton onClick={handleNaviageToSpaceshipAdminPage}>
            <Flexbox justifyContent="center" alignItems="center">
              <IconSpaceship
                className={styles.cockpitSpaceshipAdminButtonIcon}
              />
              <div>Spaceship admin</div>
            </Flexbox>
          </HUDButton>
        </Perspective>
      </Flexbox>
      <Flexbox flex="2 1 auto" alignItems="center">
        <PlanetListErrorBoundary>
          <PlanetSelectionContainer />
        </PlanetListErrorBoundary>
        <CurrentPlanetContainer />
      </Flexbox>
      <Flexbox
        flexDirection="row"
        flex="1 1 auto"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <Perspective
          value="900px"
          transform="rotateY(-40deg)"
          className={styles.cockpitHyperspaceButtonContainer}
        >
          <TravelContainer />
        </Perspective>
      </Flexbox>
    </Flexbox>
  );
}
