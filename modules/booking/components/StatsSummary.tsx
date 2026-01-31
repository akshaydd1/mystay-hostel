import React from "react";

interface StatsSummaryProps {
  label: string;
  value: number;
  icon?: React.ReactNode;
  status?: "success" | "warning" | "danger";
  subtext?: string;
}

const statusColors = {
  success: "#22C55E",
  warning: "#F59E42",
  danger: "#EF4444",
};

export const StatsSummary: React.FC<StatsSummaryProps> = ({
  label,
  value,
  icon,
  status = "success",
  subtext,
}) => (
  <div style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    background: "#fff",
    borderRadius: 12,
    padding: 20,
    minWidth: 160,
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
    border: `1px solid #F3F4F6`,
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {icon && <span>{icon}</span>}
      <span style={{ fontWeight: 700, fontSize: 28 }}>{value}</span>
    </div>
    <span style={{ color: "#6B7280", fontWeight: 500, fontSize: 15 }}>{label}</span>
    {subtext && (
      <span style={{ color: statusColors[status], fontSize: 13, marginTop: 4 }}>{subtext}</span>
    )}
  </div>
);
