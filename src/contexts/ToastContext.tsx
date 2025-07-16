"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastMessage {
  title: string;
  description: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (title: string, description: string, type?: ToastType) => void;
  toastOpen: boolean;
  setToastOpen: (open: boolean) => void;
  toastMessage: ToastMessage;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<ToastMessage>({
    title: "",
    description: "",
    type: "info",
  });

  useEffect(() => {
    if (toastOpen) {
      const timer = setTimeout(() => {
        setToastOpen(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toastOpen]);

  const showToast = (
    title: string,
    description: string,
    type: ToastType = "info"
  ) => {
    setToastMessage({ title, description, type });
    setToastOpen(true);
  };

  return (
    <ToastContext.Provider
      value={{ showToast, toastOpen, setToastOpen, toastMessage }}
    >
      {children}
    </ToastContext.Provider>
  );
};
