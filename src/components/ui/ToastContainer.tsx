"use client";

import React from "react";
import { useToast } from "@/contexts/ToastContext";
import ToastComponent from "./ToastComponent";
import { ToastProvider } from "./ToastComponent";

export const ToastContainer: React.FC = () => {
  const { toastOpen, setToastOpen, toastMessage } = useToast();

  return (
    <ToastProvider>
      <ToastComponent
        open={toastOpen}
        onOpenChange={setToastOpen}
        title={toastMessage.title}
        description={toastMessage.description}
        type={toastMessage.type}
      />
    </ToastProvider>
  );
};
