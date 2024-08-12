// Libs
import { useParams, useNavigate } from "react-router-dom";

// Components
import { Flexbox } from "../../components/Flexbox";
import { AstronautForm } from "./AstronautForm";
import { HUDPlanetDescription } from "../../components/HUDPlanetDescription";
import { HUDWindowWarning } from "../../components/HUDWindowWarning";
import { HUDWindowLoader } from "../../components/HUDWindowLoader";

// API
import {
  CreateUpdateAstronautRequestBody,
  createAstronautAPICall,
  updateAstronautAPICall,
  getOneAstronautFromAPI,
  Astronaut,
} from "../../api/astronaut.api";

// Hooks
import { useFetch } from "../../hooks/useFetch";

// Context
import { useCurrentPlanet } from "../../contexts/SpaceTravelContext";

// Styles
import styles from "./CreateOrEditAstronaut.module.css";

export function CreateOrEditAstronaut() {
  const navigate = useNavigate();
  const { astronautId } = useParams();
  const handleCreateOrEditCancel = () => navigate("/spaceship-admin");
  const handleAstronautFormCreate = async (
    astronaut: CreateUpdateAstronautRequestBody,
  ) => {
    await createAstronautAPICall(astronaut);
    navigate("/spaceship-admin");
  };
  const handleAstronautFormEdit = async (
    astronaut: CreateUpdateAstronautRequestBody,
  ) => {
    if (!astronautId) {
      throw new Error("Missing astronautId, WRONG URL!");
    }
    await updateAstronautAPICall(astronautId, astronaut);
    navigate("/spaceship-admin");
  };

  const mode = Boolean(astronautId) ? "edit" : "create";
  const handleAstronautFormSubmit =
    mode === "create" ? handleAstronautFormCreate : handleAstronautFormEdit;

  const { currentPlanet } = useCurrentPlanet();
  const { isLoading, data } = useFetch<Astronaut>((options?: RequestInit) =>
    getOneAstronautFromAPI(astronautId, options),
  );

  return (
    <Flexbox flexDirection="column" className={styles.createoreditastronaut}>
      {currentPlanet === "NO_WHERE" ? (
        <HUDWindowWarning
          warning="current planet: UnKnow"
          className={styles.createoreditastronautCurrentPlanetWarning}
        />
      ) : (
        <HUDPlanetDescription
          name={`current planet: ${currentPlanet.name}`}
          isHabitable={currentPlanet.isHabitable}
          className={styles.createoreditastronautCurrentPlanet}
        />
      )}
      <Flexbox justifyContent="center" alignItems="center">
        {isLoading ? (
          <HUDWindowLoader name="get-one-astronaut-loader" />
        ) : (
          <AstronautForm
            astronautForUpdate={data}
            mode={mode}
            onCancel={handleCreateOrEditCancel}
            onSubmit={handleAstronautFormSubmit}
            className={styles.createoreditastronautForm}
          />
        )}
      </Flexbox>
    </Flexbox>
  );
}
