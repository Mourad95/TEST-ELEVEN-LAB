// Components
import { HUDButton } from "../../../components/HUDButton";
import { Flexbox } from "../../../components/Flexbox";
import { HUDPlanetDescription } from "../../../components/HUDPlanetDescription";
import { HUDWindowWarning } from "../../../components/HUDWindowWarning";

// Context
import { useCurrentPlanet } from "../../../contexts/SpaceTravelContext";

// Styles
import styles from "./SpaceshipAdminHeaderContainer.module.css";

// SVG
import IconChevronLeft from "../../../assets/icon-chevron-left.svg?react";

type SpaceshipAdminHeaderContainerProps = {
  handleNavigateToCockpit: () => void;
  handleNavigateToCreateOrEditAstronaut: (astronautId?: number) => void;
};

export function SpaceshipAdminHeaderContainer({
  handleNavigateToCockpit,
  handleNavigateToCreateOrEditAstronaut,
}: SpaceshipAdminHeaderContainerProps) {
  const { currentPlanet } = useCurrentPlanet();

  return (
    <>
      <HUDButton
        className={styles.spaceshipadminheaderReturnButton}
        onClick={handleNavigateToCockpit}
      >
        <Flexbox justifyContent="center" alignItems="center">
          <IconChevronLeft
            className={styles.spaceshipadminheaderReturnButtonIcon}
          />
          <div>return to cockpit</div>
        </Flexbox>
      </HUDButton>
      {currentPlanet === "NO_WHERE" ? (
        <HUDWindowWarning
          className={styles.spaceshipadminheaderPlanetWarning}
          warning="current planet: Unknow"
        />
      ) : (
        <HUDPlanetDescription
          className={styles.spaceshipadminheaderPlanetDescription}
          name={`current planet: ${currentPlanet.name}`}
          isHabitable={currentPlanet.isHabitable}
        />
      )}
      <HUDButton onClick={() => handleNavigateToCreateOrEditAstronaut()}>
        Create Astronaut
      </HUDButton>
    </>
  );
}
