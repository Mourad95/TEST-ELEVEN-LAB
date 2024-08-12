// React
import { ReactNode } from "react";

// Libs
import { ErrorBoundary } from "react-error-boundary";

// Components
import { HUDWindowError } from "../../../components/HUDWindowError";

function HUDAstronautListError() {
  return (
    <HUDWindowError
      label="astronauts in the spaceship"
      error="FATAL ERROR: cannot load the list of astronaut of the spaceship from Eleven Labs space services."
    />
  );
}

export function AstronautListErrorBoundary({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ErrorBoundary FallbackComponent={HUDAstronautListError}>
      {children}
    </ErrorBoundary>
  );
}
