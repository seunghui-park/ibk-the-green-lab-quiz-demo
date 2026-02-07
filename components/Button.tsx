"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  style, // style 프롭을 받아올 수 있도록 추가
  ...props
}: ButtonProps) {
  const baseStyles: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%", // 부모 컨테이너 안에서 무조건 꽉 차게
    fontWeight: "700", // 볼드하게
    borderRadius: "16px", // 라운드 처리
    transition: "all 0.2s ease-in-out",
    cursor: "pointer",
    border: "none",
    outline: "none",
  };

  const variantStyles = {
    primary: {
      backgroundColor: "#FFFFFF", // 배경색 흰색
      color: "#1E7F4F", // 포인트 컬러 (글자)
      boxShadow: "0 8px 16px rgba(0,0,0,0.08)", // 부드러운 그림자
    },
    secondary: {
      backgroundColor: "var(--color-accent)",
      color: "var(--color-text-primary)",
      boxShadow: "var(--shadow-sm)",
    },
    outline: {
      backgroundColor: "transparent",
      color: "var(--color-primary)",
      border: "2px solid var(--color-primary)",
    },
  };

  const sizeStyles = {
    sm: { height: "48px", fontSize: "14px" },
    md: { height: "56px", fontSize: "16px" },
    lg: { height: "58px", fontSize: "20px" }, // 높이를 72px로 확 늘렸습니다!
  };

  const combinedStyles: React.CSSProperties = {
    ...baseStyles,
    ...variantStyles[variant],
    ...sizeStyles[size],
    ...style, // IntroPage에서 넘겨주는 style로 덮어쓰기 가능
  };

  return (
    <button
      style={combinedStyles}
      className={className}
      {...props}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onTouchStart={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
      onTouchEnd={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {children}
    </button>
  );
}