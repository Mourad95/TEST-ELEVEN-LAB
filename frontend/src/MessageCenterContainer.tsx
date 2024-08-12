// React
import { useEffect, useState } from "react";

// Components
import { HUDSnackbar } from "./components/HUDSnackbar";

// Helpers
import { waitMs } from "./pages/Cockpit/helper";

// Context
import { useMessageCenterContext } from "./contexts/MessageCenterContext";

export function MessageCenterContainer() {
  const { type, message, updateMessageCenterContext } =
    useMessageCenterContext();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (message) {
      setIsActive(true);
      const resetIsActive = async () => {
        await waitMs(5000);
        setIsActive(false);
        updateMessageCenterContext({ type: "info", message: null });
      };

      resetIsActive();
    }
  }, [type, message]);

  return (
    <HUDSnackbar type={type} isActive={isActive}>
      {message}
    </HUDSnackbar>
  );
}
