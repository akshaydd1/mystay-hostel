"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  Tooltip,
  ChartOptions,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import {
  CandlestickController,
  CandlestickElement,
} from "chartjs-chart-financial";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  CandlestickController,
  CandlestickElement,
  Tooltip
);

/* --------------------------------------------------------------------------
   Types
---------------------------------------------------------------------------- */
export interface CandlestickDataPoint {
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface StockCandlestickChartProps {
  /** Array of candlestick data points */
  data: CandlestickDataPoint[];
  /** Array of labels for x-axis */
  labels: string[];
  /** Chart height in pixels */
  height?: number;
  /** Whether to show grid lines */
  showGrid?: boolean;
  /** Additional className */
  className?: string;
}

/* --------------------------------------------------------------------------
   Component
---------------------------------------------------------------------------- */
/**
 * StockCandlestickChart - A candlestick chart component for stock price visualization
 * 
 * @example
 * ```tsx
 * <StockCandlestickChart
 *   data={candlestickData}
 *   labels={['9:30', '10:00', '10:30']}
 *   height={300}
 * />
 * ```
 */
export const StockCandlestickChart: React.FC<StockCandlestickChartProps> = ({
  data,
  labels,
  height = 300,
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

  // Prepare candlestick data in the format required by chartjs-chart-financial
  // Each data point needs: x, o (open), h (high), l (low), c (close)
  const candlestickData = data.map((item, index) => ({
    x: index,
    o: item.open,
    h: item.high,
    l: item.low,
    c: item.close,
  }));


  const chartData = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: candlestickData,
        color: {
          up: "#00a850", // green for bullish
          down: "#ee212e", // red for bearish
          unchanged: "#666666", // gray for unchanged
        },
      },
    ],
  } as any;

  const options: ChartOptions<"candlestick"> = {
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
          weight: "bold" as const,
        },
        bodyFont: {
          size: 11,
        },
        callbacks: {
          label: function (context: any) {
            const dataPoint = context.raw;
            if (!dataPoint) return "";

            return [
              `Open: ₹${dataPoint.o?.toFixed(2)}`,
              `High: ₹${dataPoint.h?.toFixed(2)}`,
              `Low: ₹${dataPoint.l?.toFixed(2)}`,
              `Close: ₹${dataPoint.c?.toFixed(2)}`,
            ];
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
        type: "category",
        grid: {
          display: showGrid,
          color: "rgba(0, 0, 0, 0.08)",
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
        },
        ticks: {
          color: "#666666",
          font: {
            size: 11,
          },
          padding: 8,
          callback: function (value: any) {
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
      <Chart type="candlestick" data={chartData} options={options} />
    </div>
  );
};

export default StockCandlestickChart;
