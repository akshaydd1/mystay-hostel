"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartDataLabels,
);

export interface ChartBarSeries {
  label: string;
  data: number[];
  color?: string;
}

export interface ChartBarProps {
  labels: string[];
  series: ChartBarSeries[];
  stacked?: boolean;
  height?: number;
  legendPosition?: "top" | "bottom" | "left" | "right";
  hideYAxis?: boolean;
  showDataLabels?: boolean;
  borderRadius?: string;
}

const ChartBar: React.FC<ChartBarProps> = ({
  labels,
  series,
  stacked = false,
  height = 250,
  legendPosition = "bottom",
  hideYAxis = false,
  showDataLabels = false,
  borderRadius,
}) => {
  // Resolve CSS variables to actual color values
  const resolveColor = (input: string): string => {
    if (!input) return "#6ee7b7";
    if (typeof window === "undefined" || typeof document === "undefined") {
      return input;
    }

    // If it's a CSS variable like "var(--color-mofsl-blue-main)",
    // resolve it against the root element.
    const varMatch = input.match(/var\((--[^,\)]+)[^)]*\)/);
    if (!varMatch) return input;

    const varName = varMatch[1];
    const value = getComputedStyle(document.documentElement).getPropertyValue(
      varName,
    );
    return value?.trim() || input;
  };

  // Chart.js expects borderRadius to be a number, an object, or a function, but not a string.
  // We'll parse the borderRadius prop: if it's a number string, convert to number; if it's a string like "8px", parseInt; else use default object.
  const parseBorderRadius = (input?: string) => {
    if (!input)
      return { topLeft: 8, topRight: 8, bottomLeft: 0, bottomRight: 0 };
    const num = Number(input);
    if (!isNaN(num)) return num;
    const pxMatch = input.match(/^(\d+)px$/);
    if (pxMatch) return Number(pxMatch[1]);
    // fallback to default object
    return { topLeft: 8, topRight: 8, bottomLeft: 0, bottomRight: 0 };
  };

  const data = {
    labels,
    datasets: series.map((s) => ({
      label: s.label,
      data: s.data,
      backgroundColor: resolveColor(s.color || "#6ee7b7"),
      borderWidth: 1,
      borderRadius: parseBorderRadius(borderRadius),
      borderSkipped: false, // Ensures borderRadius applies
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false as const,
    plugins: {
      legend: {
        position: legendPosition,
        labels: { font: { size: 0 } },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.dataset.label || "";
            const value = context.parsed.y || 0;
            return `${label}: ${value.toLocaleString()}`;
          },
        },
      },
      datalabels: {
        display: showDataLabels,
        anchor: "end" as const,
        align: "top" as const,
        color: "#2e3238",
        font: {
          size: 11,
          weight: 800 as const,
        },
        formatter: (value: number) => {
          if (value === 0) return "";
          // Format as thousands (K)
          const thousands = value / 1000;
          return `${thousands.toFixed(1)}K`;
        },
      },
    },
    scales: {
      x: { stacked },
      y: {
        stacked,
        beginAtZero: true,
        display: !hideYAxis,
      },
    },
  };

  return (
    <div style={{ height }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ChartBar;
