import React from "react";

const counters = [
  {
    value: "1,000+",
    label: "HOSTELS MANAGED",
  },
  {
    value: "50,000+",
    label: "RESIDENTS TRACKED",
  },
  {
    value: "$2M+",
    label: "RENT PROCESSED MONTHLY",
  },
];

export default function Counter() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "6rem",
      padding: "2rem 0",
      background: "#fff",
    }}>
      {counters.map((item, idx) => (
        <div key={idx} style={{ textAlign: "center", minWidth: 200 }}>
          <div style={{
            color: "#2086F7",
            fontWeight: 700,
            fontSize: 32,
            lineHeight: 1.1,
            marginBottom: 8,
          }}>{item.value}</div>
          <div style={{
            color: "#6B7280",
            fontWeight: 500,
            fontSize: 12,
            letterSpacing: 1,
            textTransform: "uppercase",
          }}>{item.label}</div>
        </div>
      ))}
    </div>
  );
}
