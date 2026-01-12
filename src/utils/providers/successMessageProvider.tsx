import React, { createContext, useContext, useState, ReactNode } from "react";

interface SuccessMessageContextType {
  message: string;
  setSuccessMessage: (message: string) => void;
  clearSuccessMessage: () => void;
}

const SuccessMessageContext = createContext<
  SuccessMessageContextType | undefined
>(undefined);

export const SuccessMessageProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [message, setMessage] = useState<string>("");

  const setSuccessMessage = (message: string) => setMessage(message);
  const clearSuccessMessage = () => setMessage("");

  return (
    <SuccessMessageContext.Provider
      value={{ message, setSuccessMessage, clearSuccessMessage }}
    >
      {children}
    </SuccessMessageContext.Provider>
  );
};

// Custom hook to access the SuccessMessageContext
export const useSuccessMessage = (): SuccessMessageContextType => {
  const context = useContext(SuccessMessageContext);
  if (!context) {
    throw new Error(
      "useSuccessMessage must be used within a SuccessMessageProvider"
    );
  }
  return context;
};
