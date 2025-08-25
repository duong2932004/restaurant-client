import React from "react";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Loading({ size = "md", className = "" }: LoadingProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img
        src="/assets/gif/loading.gif"
        alt="Loading..."
        className={sizeClasses[size]}
      />
    </div>
  );
}

export function LoadingSpinner({ size = "md", className = "" }: LoadingProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-b-2 border-orange-500`}
      />
    </div>
  );
}

export function LoadingPage({ size = "lg", className = "" }: LoadingProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Loading size={size} className={className} />
    </div>
  );
}

export function LoadingContainer({
  size = "md",
  className = "",
}: LoadingProps) {
  return (
    <div className="flex items-center justify-center h-64">
      <Loading size={size} className={className} />
    </div>
  );
}

