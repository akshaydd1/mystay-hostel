"use client";

import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler
);

/* --------------------------------------------------------------------------
   Types
---------------------------------------------------------------------------- */
export interface StockPriceChartProps {
  /** Array of price data points */
  data: number[];
  /** Array of labels for x-axis (timestamps/dates) */
  labels: string[];
  /** Chart type - line or candle */
  chartType?: "line" | "candle";
  /** Chart height in pixels */
  height?: number;
  /** Primary color for the line */
  lineColor?: string;
  /** Background gradient color (with opacity) */
  fillColor?: string;
  /** Whether to show grid lines */
  showGrid?: boolean;
  /** Additional className */
  className?: string;
}

/* --------------------------------------------------------------------------
   Component
---------------------------------------------------------------------------- */
/**
 * StockPriceChart - A reusable stock price chart component using Chart.js
 * 
 * @example
 * ```tsx
 * <StockPriceChart
 *   data={[100, 105, 102, 108, 110]}
 *   labels={['9:30', '10:00', '10:30', '11:00', '11:30']}
 *   chartType="line"
 *   height={300}
 * />
 * ```
 */
export const StockPriceChart: React.FC<StockPriceChartProps> = ({
  data,
  labels,
  chartType = "line",
  height = 300,
  lineColor = "#4b87fb",
  fillColor = "rgba(75, 135, 251, 0.15)",
  showGrid = true,
  className = "",
}) => {
  // Handle empty data
  if (!data || data.length === 0) {
    return (
      <div
        className={`w-full flex items-center justify-center ${className}`}
        style={{ height: `${height}px` }}
      >
        <p className="text-mo-capsule-tab-text-inactive text-mo-size-sm">
          No chart data available
        </p>
      </div>
    );
  }

  // Chart dataset configuration
  const dataset = {
    labels,
    datasets: [
      {
        data,
        borderColor: lineColor,
        backgroundColor: fillColor,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: lineColor,
        pointHoverBorderColor: "#ffffff",
        pointHoverBorderWidth: 2,
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Chart options configuration
  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        titleColor: "#333",
        bodyColor: "#666",
        borderColor: "#dddddd",
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        titleFont: {
          size: 12,
          weight: 600,
        },
        bodyFont: {
          size: 12,
        },
        callbacks: {
          label: function (context) {
            const value = context.parsed?.y;
            return value !== null ? `Price: ₹${value.toFixed(2)}` : '';
          },
        },
      },
      datalabels: {
        display: false,
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: showGrid,
          color: "rgba(0, 0, 0, 0.08)",
          lineWidth: 1,
        },
        ticks: {
          color: "#666666",
          font: {
            size: 11,
          },
          maxRotation: 0,
          autoSkipPadding: 30,
        },
        border: {
          display: false,
        },
      },
      y: {
        display: true,
        position: "left",
        grid: {
          display: showGrid,
          color: "rgba(0, 0, 0, 0.08)",
          lineWidth: 1,
        },
        ticks: {
          color: "#666666",
          font: {
            size: 11,
          },
          padding: 8,
          callback: function (value) {
            return value;
          },
        },
        border: {
          display: false,
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
  };

  return (
    <div className={`w-full ${className}`} style={{ height: `${height}px` }}>
      <Line data={dataset} options={options} />
    </div>
  );
};

export default StockPriceChart;
