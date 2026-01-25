"use client";

import React from 'react';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, ChartDataLabels, ChartDataLabels);

interface TinyLineChartProps {
  data?: number[];
  /** Optional labels for each data point (e.g., quarters). */
  labels?: string[];
  /** Optional series label used in the tooltip (e.g., "Promoter"). */
  seriesLabel?: string;
  /**
   * Base width of the chart in pixels. When `responsiveWidth` is true,
   * this is treated as the desktop width.
   */
  width?: number;
  /** Optional width (in pixels) to use on mobile when `responsiveWidth` is true. */
  mobileWidth?: number;
  height?: number;
  color?: string;
  backgroundColor?: string;
  /** Enable responsive width behaviour (desktop vs mobile). */
  responsiveWidth?: boolean;
  /** Show X-axis labels below the chart. */
  showXAxis?: boolean;
  /** Show data labels above each point. */
  showDataLabels?: boolean;
  /** Use full container width instead of fixed width. */
  fullWidth?: boolean;
  pointRadius?: number;
}

const TinyLineChart: React.FC<TinyLineChartProps> = ({
  data = [],
  labels,
  backgroundColor = 'transparent',
  seriesLabel,
  width = 80,
  mobileWidth = 80,
  height = 24,
  color = 'var(--color-mofsl-blue-secondary)',
  responsiveWidth = false,
  showXAxis = false,
  showDataLabels = false,
  fullWidth = false,
  pointRadius= 7,
}) => {
  if (!data || data.length === 0) {
    return <div className="text-xs text-gray-400">-</div>;
  }

  const [chartWidth, setChartWidth] = React.useState(width);

  React.useEffect(() => {
    if (!responsiveWidth) return;
    if (typeof window === 'undefined') return;

    const updateWidth = () => {
      const isMobile = window.innerWidth < 768;
      setChartWidth(isMobile ? mobileWidth : width);
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, [responsiveWidth, mobileWidth, width]);

  const resolveColor = (input: string): string => {
    if (!input) return 'var(--color-mofsl-blue-secondary)';
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return input;
    }

    // If it's a CSS variable like "var(--color-mofsl-blue-main)",
    // resolve it against the root element.
    const varMatch = input.match(/var\((--[^,\)]+)[^)]*\)/);
    if (!varMatch) return input;

    const varName = varMatch[1];
    const value = getComputedStyle(document.documentElement).getPropertyValue(
      varName
    );
    return value?.trim() || input;
  };

  const chartLabels =
    labels && labels.length === data.length
      ? labels
      : data.map((_, i) => i.toString());

  const resolvedColor = resolveColor(color);

  const dataset = {
    labels: chartLabels,
    datasets: [
      {
        data,
        borderColor: resolvedColor,
        backgroundColor: backgroundColor,
        borderWidth: 2,
        tension: 0.3,
        pointRadius: pointRadius,
        pointHoverRadius: 9,
        pointBackgroundColor: resolvedColor,
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
      },
    ],
  };

  const externalTooltipHandler = (context: any) => {
    const { chart, tooltip } = context;
    const canvas = chart.canvas as HTMLCanvasElement;
    const parent = canvas.parentNode as HTMLElement | null;

    if (!parent) return;

    let tooltipEl = parent.querySelector<HTMLDivElement>(
      '.tiny-line-tooltip'
    );

    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.className =
        'tiny-line-tooltip pointer-events-none bg-mo-white text-mo-text-dark shadow-mo-shadow-md rounded-mo-radius-md px-3 py-2 text-[11px] leading-tight';
      tooltipEl.style.position = 'absolute';
      tooltipEl.style.transform = 'translate(-50%, -120%)';
      tooltipEl.style.transition = 'opacity 150ms ease-out';
      tooltipEl.style.opacity = '0';
      parent.style.position = parent.style.position || 'relative';
      parent.appendChild(tooltipEl);
    }

    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = '0';
      return;
    }

    const dataPoint = tooltip.dataPoints?.[0];
    const quarterLabel = dataPoint?.label ?? '';
    const value =
      typeof dataPoint?.parsed?.y === 'number'
        ? dataPoint.parsed.y
        : Number(dataPoint?.raw ?? 0);

    const formattedValue = Number.isFinite(value)
      ? `${value.toFixed(1)}%`
      : '';

    const labelText = seriesLabel || '';

    tooltipEl.innerHTML = `
      <div class="text-[10px] text-mo-text-muted mb-0.5">${quarterLabel}</div>
      <div class="text-[11px] text-mo-text-dark">
        ${labelText ? `${labelText}: ` : ''}<span class="font-semibold">${formattedValue}</span>
      </div>
    `;

    const { offsetLeft, offsetTop } = canvas;
    tooltipEl.style.left = `${offsetLeft + tooltip.caretX}px`;
    tooltipEl.style.top = `${offsetTop + tooltip.caretY}px`;
    tooltipEl.style.opacity = '1';
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false as const,
    layout: {
      padding: {
        top: showDataLabels ? 25 : 0,
        bottom: 0,
        left: 10,
        right: 10,
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: false,
        external: externalTooltipHandler,
      },
      datalabels: {
        display: showDataLabels,
        anchor: 'end' as const,
        align: 'top' as const,
        color: '#2e3238',
        font: {
          size: 11,
          weight: 600 as const,
        },
        formatter: (value: number) => {
          if (!Number.isFinite(value)) return '';
          return value.toFixed(1);
        },
      },
    },
    scales: {
      x: {
        display: showXAxis,
        grid: { display: false },
        ticks: {
          color: '#8c8e90',
          font: { size: 11 },
        },
        border: { display: false },
      },
      y: { display: false },
    },
  };

  return (
    <div 
      className={fullWidth ? 'w-full' : undefined}
      style={fullWidth ? { height } : { width: responsiveWidth ? chartWidth : width, height }}
    >
      <Line data={dataset} options={options} />
    </div>
  );
};

export default TinyLineChart;
