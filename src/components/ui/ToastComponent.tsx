import * as React from "react";
import * as Toast from "@radix-ui/react-toast";

interface ToastProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  type: "success" | "error" | "warning" | "info";
}

const ToastComponent: React.FC<ToastProps> = ({
  open,
  onOpenChange,
  title,
  description,
  type,
}) => {
  const getToastStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-500 text-white";
      case "error":
        return "bg-red-500 text-white";
      case "warning":
        return "bg-yellow-500 text-black";
      default:
        return "bg-white text-gray-900 border border-gray-200";
    }
  };

  return (
    <Toast.Root
      className={`rounded-lg shadow-lg p-4 flex flex-col gap-1 data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=open]:slide-in-from-top-full data-[state=closed]:slide-out-to-right-full data-[swipe=cancel]:slide-transition data-[swipe=end]:slide-transition ${getToastStyles()}`}
      open={open}
      onOpenChange={onOpenChange}
    >
      <Toast.Title
        className={`text-sm font-semibold ${
          type === "success" || type === "error"
            ? "text-white"
            : "text-gray-900"
        }`}
      >
        {title}
      </Toast.Title>
      {description && (
        <Toast.Description
          className={`text-sm ${
            type === "success" || type === "error"
              ? "text-white/90"
              : "text-gray-600"
          }`}
        >
          {description}
        </Toast.Description>
      )}
    </Toast.Root>
  );
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Toast.Provider swipeDirection="right">
      {children}
      <Toast.Viewport className="fixed bottom-0 right-0 flex flex-col p-4 gap-2 w-96 max-w-[100vw] m-0 z-[2147483647] outline-none" />
    </Toast.Provider>
  );
};

export default ToastComponent;
