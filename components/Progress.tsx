"use client";

import React from "react";

interface ProgressProps {
  current: number;
  total: number;
}

export default function Progress({ current, total }: ProgressProps) {
  const percentage = (current / total) * 100;

  return (
    <div
      style={{
        width: "100%",
        height: "8px",
        backgroundColor: "var(--color-primary-light)",
        borderRadius: "var(--radius-pill)",
        overflow: "hidden",
        marginBottom: "var(--space-md)",
      }}
    >
      <div
        style={{
          width: `${percentage}%`,
          height: "100%",
          backgroundColor: "var(--color-primary)",
          borderRadius: "var(--radius-pill)",
          transition: "width var(--transition-normal) var(--motion-bounce)",
        }}
      />
    </div>
  );
}
