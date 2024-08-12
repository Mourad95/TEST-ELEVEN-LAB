// React
import { CSSProperties } from "react";

// Components
import { HUDButton } from "../../../components/HUDButton";

// Helper
import { waitMs } from "../helper";

// Context
import {
  useSelectedPlanetForSpaceTravel,
  useIsTraveling,
  useCurrentPlanet,
} from "../../../contexts/SpaceTravelContext";
import { useMessageCenter } from "../../../contexts/MessageCenterContext";

type TravelContainerProps = {
  style?: CSSProperties;
};

export function TravelContainer({ style }: TravelContainerProps) {
  const { selectedPlanetForSpaceTravel, setSelectedPlanetForSpaceTravel } =
    useSelectedPlanetForSpaceTravel();
  const { isTraveling, setIsTraveling } = useIsTraveling();
  const { setCurrentPlanet } = useCurrentPlanet();
  const { pushInfoMessage } = useMessageCenter();

  const handleLaunchTravel = async () => {
    pushInfoMessage(
      `Space Travel to ${selectedPlanetForSpaceTravel?.name} planet in progress ...`,
    );
    setIsTraveling(true);
    setCurrentPlanet("NO_WHERE");
    await waitMs(5000);
    if (selectedPlanetForSpaceTravel) {
      setCurrentPlanet(selectedPlanetForSpaceTravel);
      setSelectedPlanetForSpaceTravel(undefined);
    }
    setIsTraveling(false);
  };

  const isPlanetSelected = !Boolean(selectedPlanetForSpaceTravel);

  return (
    <HUDButton
      size="xl"
      disabled={isPlanetSelected}
      isActive={isTraveling}
      style={style}
      onClick={handleLaunchTravel}
    >
      HYPERSPACE
    </HUDButton>
  );
}
