import React from 'react';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut, Pie } from 'react-chartjs-2';

Chart.register(ArcElement, Tooltip, Legend);

export type ChartDonutPieType = 'doughnut' | 'pie';

export interface ChartDonutPieProps {
  type?: ChartDonutPieType;
  labels: string[];
  data: number[];
  colors?: string[];
  legendPosition?: 'top' | 'bottom' | 'left' | 'right';
  showLegend?: boolean;
  style?: React.CSSProperties;
}

const defaultColors = [
  '#a3e635', // QIB lime
  '#1b1913', // NIB amber
  '#6ee7b7', // Retail emerald
  '#38bdf8', // Employee sky
  '#fef08a', // Others yellow
];
const chartLabels = ['QIB', 'NIB', 'Retail', 'Employee', 'Others'];

/**
 * Resolves a CSS variable (e.g., "var(--color-name)") to its computed value.
 * Returns the original color if it's not a CSS variable.
 */
function resolveColor(color: string): string {
  if (typeof window === 'undefined') return color;
  
  const varMatch = color.match(/^var\(--([^)]+)\)$/);
  if (!varMatch) return color;
  
  const computedValue = getComputedStyle(document.documentElement)
    .getPropertyValue(`--${varMatch[1]}`)
    .trim();
  
  return computedValue || color;
}

/**
 * Resolves an array of colors, converting any CSS variables to their computed values.
 */
function resolveColors(colors: string[]): string[] {
  return colors.map(resolveColor);
}

export const ChartDonutPie: React.FC<ChartDonutPieProps> = ({
  type = 'doughnut',
  labels = chartLabels,
  data,
  colors = defaultColors,
  legendPosition = 'right',
  showLegend = false,
  style,
}) => {
  // Resolve CSS variables to actual color values for Chart.js
  const resolvedColors = React.useMemo(() => resolveColors(colors), [colors]);

  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: resolvedColors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: showLegend,
        position: legendPosition,
        labels: {
          font: { size: 12 },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percent = total ? ((value / total) * 100).toFixed(2) : '0.00';
            return `${label}: ${value.toLocaleString()} (${percent}%)`;
          },
        },
      },
      datalabels: {
        display: false,
      },
    },
    cutout: type === 'doughnut' ? '70%' : undefined,
  };

  return (
    <div style={style}>
      {type === 'doughnut' ? (
        <Doughnut data={chartData} options={options} />
      ) : (
        <Pie data={chartData} options={options} />
      )}
    </div>
  );
};

export default ChartDonutPie;
