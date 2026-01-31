import React from "react";

interface ActionButtonProps {
  label: string;
  onClick: () => void;
  color?: "primary" | "secondary";
}

const colors = {
  primary: {
    background: "#2563EB",
    color: "#fff",
  },
  secondary: {
    background: "#F3F4F6",
    color: "#374151",
  },
};

export const ActionButton: React.FC<ActionButtonProps> = ({ label, onClick, color = "primary" }) => (
  <button
    style={{
      ...colors[color],
      borderRadius: 6,
      padding: "4px 12px",
      border: "none",
      fontWeight: 500,
      fontSize: 14,
      cursor: "pointer",
      marginLeft: 8,
    }}
    onClick={onClick}
  >
    {label}
  </button>
);
