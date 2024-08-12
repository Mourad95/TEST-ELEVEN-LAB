// React
import { useEffect } from "react";

// Libs
import { useNavigate } from "react-router-dom";

// Components
import { Flexbox } from "../../components/Flexbox";
import { AstronautListErrorBoundary } from "./AstronautListErrorBoundary";

// Containers
import { AstronautListContainer } from "./AstronautListContainer";
import { SpaceshipAdminHeaderContainer } from "./SpaceshipAdminHeaderContainer";

// Hooks
import { useFetch } from "../../hooks/useFetch";

// API
import {
  getAstronautListFromAPI,
  GetAstronautListAPIResponse,
} from "../../api/astronaut.api";

// Context
import { useAstronautList } from "../../contexts/SpaceshipContext";

// Styles
import styles from "./SpaceshipAdmin.module.css";

export function SpaceshipAdmin() {
  const navigate = useNavigate();

  const handleNavigateToCockpit = () => navigate("/");
  const handleNavigateToCreateOrEditAstronaut = (astronautId?: number) =>
    astronautId
      ? navigate(`/astronaut/edit/${astronautId}`)
      : navigate(`/astronaut/create`);

  const { isLoading, data, error } = useFetch<GetAstronautListAPIResponse>(
    getAstronautListFromAPI,
  );
  const { setAstronautList } = useAstronautList();

  useEffect(() => {
    setAstronautList({ isLoading, astronautList: data, error });
  }, [data, error, isLoading]);

  return (
    <Flexbox className={styles.spaceshipadmin} flexDirection="column">
      <Flexbox justifyContent="center" alignItems="center">
        <SpaceshipAdminHeaderContainer
          handleNavigateToCockpit={handleNavigateToCockpit}
          handleNavigateToCreateOrEditAstronaut={
            handleNavigateToCreateOrEditAstronaut
          }
        />
      </Flexbox>
      <Flexbox justifyContent="center" alignItems="center">
        <AstronautListErrorBoundary>
          <AstronautListContainer
            handleNavigateToCreateOrEditAstronaut={
              handleNavigateToCreateOrEditAstronaut
            }
          />
        </AstronautListErrorBoundary>
      </Flexbox>
    </Flexbox>
  );
}
