// Components
import {
  HUDAstronautList,
  AstronautForList,
} from "../../../components/HUDAstronautList";
import { HUDWindowLoader } from "../../../components/HUDWindowLoader";

// Context
import { useAstronautList } from "../../../contexts/SpaceshipContext";
import { useMessageCenter } from "../../../contexts/MessageCenterContext";

// Types
import { Astronaut } from "../../../api/astronaut.api";

// API
import { deleteAstronautAPICall } from "../../../api/astronaut.api";

// Styles
import styles from "./AstronautListContainer.module.css";

function mapAstronautList(astronautList?: Astronaut[] | null) {
  if (!astronautList) {
    return [];
  }

  return astronautList.map(
    ({ id, firstname, lastname, originPlanet }: Astronaut) => ({
      id,
      firstname,
      lastname,
      planetOfOrigin: originPlanet.name,
    }),
  );
}

type AstronautListContainerProps = {
  handleNavigateToCreateOrEditAstronaut: (astronautId: number) => void;
};

export function AstronautListContainer({
  handleNavigateToCreateOrEditAstronaut,
}: AstronautListContainerProps) {
  const {
    astronautList: { isLoading, astronautList: astronauts, error },
    setAstronautList,
  } = useAstronautList();
  const { pushInfoMessage, pushErrorMessage } = useMessageCenter();

  const handleDeleteAstronaut = async (astronaut: AstronautForList) => {
    const astronautToDelete = astronauts?.find(
      (astro: Astronaut) => astronaut.id === astro.id,
    );
    try {
      const newAstronautList = astronauts?.filter(
        (astro: Astronaut) => astro.id !== astronaut.id,
      );
      setAstronautList({ isLoading: false, astronautList: newAstronautList });
      await deleteAstronautAPICall(astronaut.id);
      pushInfoMessage(
        `Astronaut ${astronautToDelete?.firstname} ${astronautToDelete?.lastname} has been deleted from Eleven Labs space service`,
      );
    } catch (error) {
      setAstronautList({ isLoading: false, astronautList: astronauts });
      pushErrorMessage(
        `Cannot delete ${astronautToDelete?.firstname} ${astronautToDelete?.lastname} from the Eleven Labs space service`,
      );
    }
  };

  if (error) {
    pushErrorMessage("Eleven Labs space services are not online ...");
    throw error;
  }

  return (
    <>
      {!isLoading ? (
        <HUDWindowLoader
          name="astronautlist-laoder"
          label="astronaut in the spaceship"
          className={styles.astronautlistcontainer}
        />
      ) : (
        <HUDAstronautList
          label="astronauts in the spaceship"
          astronautList={mapAstronautList(astronauts)}
          onEdit={({ id }: AstronautForList) =>
            handleNavigateToCreateOrEditAstronaut(id)
          }
          onDelete={handleDeleteAstronaut}
          className={styles.astronautlistcontainer}
          emptyAstronautListMessage="Any astronaut in your spaceship"
        />
      )}
    </>
  );
}
