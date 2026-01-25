import type { Meta, StoryObj } from '@storybook/react';
import ChartBar from '../ChartBar';

const meta: Meta<typeof ChartBar> = {
  title: 'Components/Elements/CustomCharts/ChartBar',
  component: ChartBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A bar chart component built with Chart.js. Supports multiple series, stacked bars, and customizable styling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    labels: {
      control: 'object',
      description: 'X-axis labels',
    },
    series: {
      control: 'object',
      description: 'Array of data series to display',
    },
    stacked: {
      control: 'boolean',
      description: 'Whether bars should be stacked',
    },
    height: {
      control: 'number',
      description: 'Chart height in pixels',
    },
    legendPosition: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Legend position',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ChartBar>;

// Single series
export const SingleSeries: Story = {
  args: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    series: [
      {
        label: 'Sales',
        data: [120, 190, 300, 500, 200, 300],
        color: '#6ee7b7',
      },
    ],
    height: 300,
  },
};

// Multiple series
export const MultipleSeries: Story = {
  args: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    series: [
      {
        label: 'Product A',
        data: [100, 200, 150, 250],
        color: '#6ee7b7',
      },
      {
        label: 'Product B',
        data: [150, 180, 200, 180],
        color: '#38bdf8',
      },
      {
        label: 'Product C',
        data: [80, 120, 100, 150],
        color: '#fbbf24',
      },
    ],
    height: 300,
  },
};

// Stacked bars
export const Stacked: Story = {
  args: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    series: [
      {
        label: 'Direct',
        data: [50, 60, 70, 80, 90],
        color: '#6ee7b7',
      },
      {
        label: 'Referral',
        data: [30, 40, 50, 60, 70],
        color: '#38bdf8',
      },
      {
        label: 'Organic',
        data: [20, 30, 40, 50, 60],
        color: '#fbbf24',
      },
    ],
    stacked: true,
    height: 300,
  },
};

// Custom colors
export const CustomColors: Story = {
  args: {
    labels: ['2020', '2021', '2022', '2023', '2024'],
    series: [
      {
        label: 'Revenue',
        data: [1000, 1200, 1500, 1800, 2000],
        color: '#a3e635',
      },
      {
        label: 'Expenses',
        data: [800, 900, 1100, 1300, 1500],
        color: '#f87171',
      },
    ],
    height: 300,
    legendPosition: 'top',
  },
};

// Large dataset
export const LargeDataset: Story = {
  args: {
    labels: Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`),
    series: [
      {
        label: 'Values',
        data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 1000)),
        color: '#6366f1',
      },
    ],
    height: 400,
  },
};

