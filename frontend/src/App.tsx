// React
import React from "react";

// Libs
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Components
import { CreateOrEditAstronaut } from "./pages/CreateOrEditAstronaut";
import { Cockpit } from "./pages/Cockpit";
import { SpaceshipAdmin } from "./pages/SpaceshipAdmin";

// Containers
import { MessageCenterContainer } from "./MessageCenterContainer";

// Context
import { SpaceTravelProvider } from "./contexts/SpaceTravelContext";
import { SpaceshipProvider } from "./contexts/SpaceshipContext";
import { MessageCenterProvider } from "./contexts/MessageCenterContext";

export function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Cockpit />,
    },
    {
      path: "/spaceship-admin",
      element: <SpaceshipAdmin />,
    },
    {
      path: "/astronaut/create",
      element: <CreateOrEditAstronaut />,
    },
    {
      path: "/astronaut/edit/:astronautId",
      element: <CreateOrEditAstronaut />,
    },
  ]);

  return (
    <React.StrictMode>
      <SpaceTravelProvider>
        <SpaceshipProvider>
          <MessageCenterProvider>
            <RouterProvider router={router} />
            <MessageCenterContainer />
          </MessageCenterProvider>
        </SpaceshipProvider>
      </SpaceTravelProvider>
    </React.StrictMode>
  );
}
