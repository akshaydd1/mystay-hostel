"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export interface SteppedLineChartProps {
  data: number[];
  labels?: string[];
  height?: number;
  color?: string;
  pointRadius?: number;
  borderWidth?: number;
}

const defaultLabels = (len: number) => Array.from({ length: len }, (_, i) => String(i + 1));

const SteppedLineChart: React.FC<SteppedLineChartProps> = ({
  data,
  labels,
  height = 40,
  color = "#2b2e8c",
  pointRadius = 0,
  borderWidth = 2,
}) => {
  const chartData = {
    labels: labels || defaultLabels(data.length),
    datasets: [
      {
        label: "",
        data,
        borderColor: color,
        backgroundColor: color,
        fill: false,
        stepped: true,
        pointRadius,
        borderWidth,
        tension: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
      datalabels: { display: false }, // Hide datalabels if plugin is loaded
    },
    elements: {
      line: { borderJoinStyle: "miter" as const },
    },
    scales: {
      x: { display: false },
      y: { display: false },
    },
    maintainAspectRatio: false,
  };

  return (
    <div style={{ width: "100%", height }}>
      <Line data={chartData} options={options} height={height} />
    </div>
  );
};

export default SteppedLineChart;
