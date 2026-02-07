"use client";

import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "primary";
}

export default function Badge({
  children,
  variant = "default",
}: BadgeProps) {
  const variantStyles = {
    default: {
      backgroundColor: "var(--color-surface)",
      color: "var(--color-text-secondary)",
    },
    success: {
      backgroundColor: "var(--color-success)",
      color: "#FFFFFF",
    },
    primary: {
      backgroundColor: "var(--color-primary-light)",
      color: "var(--color-primary)",
    },
  };

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-xs) var(--space-sm)",
        borderRadius: "var(--radius-pill)",
        fontSize: "var(--font-size-caption)",
        fontWeight: "var(--font-weight-medium)",
        ...variantStyles[variant],
      }}
    >
      {children}
    </span>
  );
}
