// React
import { createContext, useState, useContext, ReactNode } from "react";

// Error
import { ContextError } from "../errors/ContextError";

// Types
import { HUDSnackbarTypeEnum } from "../components/HUDSnackbar";

type MessageCenterContextType = {
  type: HUDSnackbarTypeEnum;
  message?: string | null;
  updateMessageCenterContext: (
    stateToUpdate: Partial<MessageCenterContextType>,
  ) => void;
};

const initialMessageCenterContext: MessageCenterContextType = {
  type: "info",
  message: null,
  updateMessageCenterContext: () => {},
};

const MessageCenterContext = createContext(initialMessageCenterContext);

export function MessageCenterProvider({ children }: { children: ReactNode }) {
  const [messageState, setMessageState] = useState<MessageCenterContextType>(
    initialMessageCenterContext,
  );

  const updateMessageCenterContext = (
    stateToUpdate: Partial<MessageCenterContextType>,
  ) => {
    setMessageState((prevState) => ({
      ...prevState,
      ...stateToUpdate,
    }));
  };

  return (
    <MessageCenterContext.Provider
      value={{
        ...messageState,
        updateMessageCenterContext,
      }}
    >
      {children}
    </MessageCenterContext.Provider>
  );
}

export function useMessageCenterContext(): MessageCenterContextType {
  const messageCenterContext = useContext(MessageCenterContext);

  if (!messageCenterContext) {
    throw new ContextError(
      "MessageCenterContext",
      "no MessageCenterContext available, is the Provider was setted?",
    );
  }

  return messageCenterContext;
}

export function useMessageCenter(): {
  pushInfoMessage: (message: string) => void;
  pushErrorMessage: (message: string) => void;
} {
  const { updateMessageCenterContext } = useMessageCenterContext();

  const pushInfoMessage = (message: string) =>
    updateMessageCenterContext({ type: "info", message });
  const pushErrorMessage = (message: string) =>
    updateMessageCenterContext({ type: "error", message });

  return { pushErrorMessage, pushInfoMessage };
}
