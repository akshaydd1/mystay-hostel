import React from "react";

interface StatusTagProps {
  status: "available" | "occupied" | "reserved" | "maintenance" | "partial" | "full" | "empty";
  children?: React.ReactNode;
}

const statusStyles: Record<string, React.CSSProperties> = {
  available: { background: "#22C55E", color: "#fff" },
  occupied: { background: "#EF4444", color: "#fff" },
  reserved: { background: "#3B82F6", color: "#fff" },
  maintenance: { background: "#F3F4F6", color: "#6B7280" },
  partial: { background: "#F59E42", color: "#fff" },
  full: { background: "#EF4444", color: "#fff" },
  empty: { background: "#22C55E", color: "#fff" },
};

export const StatusTag: React.FC<StatusTagProps> = ({ status, children }) => (
  <span style={{
    ...statusStyles[status],
    borderRadius: 6,
    padding: "2px 8px",
    fontSize: 12,
    fontWeight: 600,
    marginLeft: 8,
  }}>
    {children || status.charAt(0).toUpperCase() + status.slice(1)}
  </span>
);
