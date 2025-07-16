"use client";

import React from "react";
import { useToast } from "@/contexts/ToastContext";
import ToastComponent from "./shadcn/ToastComponent";
import { ToastProvider } from "./shadcn/ToastComponent";

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
