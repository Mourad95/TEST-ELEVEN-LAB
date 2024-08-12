// Libs
import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";

// Components
import { HUDWindowError } from "../../../components/HUDWindowError";
import { Perspective } from "../../../components/Perspective";

// Styles
import styles from "./PlanetListErrorBoundary.module.css";

function HUDPlanetListError() {
  return (
    <Perspective
      value="900px"
      transform="rotateY(40deg)"
      className={styles.planetlisterrorboundary}
    >
      <HUDWindowError
        label="planet list for travel"
        error="FATAL ERROR: cannot load planet list from Eleven Labs space services."
      />
    </Perspective>
  );
}

export function PlanetListErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary FallbackComponent={HUDPlanetListError}>
      {children}
    </ErrorBoundary>
  );
}
