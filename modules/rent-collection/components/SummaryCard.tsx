import React from 'react';

interface SummaryCardProps {
  title: string;
  value: string;
  subtext?: string;
  icon?: React.ReactNode;
  valueColor?: string;
  subtextColor?: string;
  bgColor?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  subtext,
  icon,
  valueColor = '#111827',
  subtextColor = '#16A34A',
  bgColor = '#fff',
}) => (
  <div className="flex-1 min-w-[220px] bg-white rounded-xl shadow-sm p-6 flex flex-col gap-2 border border-gray-100">
    <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
      {icon}
      {title}
    </div>
    <div className="text-2xl font-bold" style={{ color: valueColor }}>{value}</div>
    {subtext && (
      <div className="text-xs font-medium" style={{ color: subtextColor }}>{subtext}</div>
    )}
  </div>
);

export default SummaryCard;
