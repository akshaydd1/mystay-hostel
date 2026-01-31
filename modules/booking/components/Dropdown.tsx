import React from "react";

interface DropdownProps {
  options: Array<{ label: string; value: string }>;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({ options, value, onChange, placeholder }) => (
  <select
    style={{
      padding: "8px 12px",
      borderRadius: 8,
      border: "1px solid #E5E7EB",
      background: "#fff",
      fontSize: 15,
      color: "#374151",
      minWidth: 120,
      marginRight: 12,
    }}
    value={value}
    onChange={e => onChange(e.target.value)}
  >
    {placeholder && <option value="" disabled>{placeholder}</option>}
    {options.map(opt => (
      <option key={opt.value} value={opt.value}>{opt.label}</option>
    ))}
  </select>
);
