import type { Meta, StoryObj } from '@storybook/react';
import TinyLineChart from '../TinyLineChart';

const meta: Meta<typeof TinyLineChart> = {
  title: 'Components/Elements/CustomCharts/TinyLineChart',
  component: TinyLineChart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A compact line chart component for displaying small data trends. Perfect for inline displays or table cells.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: 'Array of numeric values to plot',
    },
    width: {
      control: 'number',
      description: 'Chart width in pixels',
    },
    height: {
      control: 'number',
      description: 'Chart height in pixels',
    },
    color: {
      control: 'color',
      description: 'Line color',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TinyLineChart>;

// Default chart
export const Default: Story = {
  args: {
    data: [10, 20, 15, 25, 30, 20, 35, 40, 30, 45],
    width: 80,
    height: 24,
    color: '#6366f1',
  },
};

// Upward trend
export const UpwardTrend: Story = {
  args: {
    data: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55],
    width: 100,
    height: 30,
    color: '#10b981',
  },
};

// Downward trend
export const DownwardTrend: Story = {
  args: {
    data: [50, 45, 40, 35, 30, 25, 20, 15, 10, 5],
    width: 100,
    height: 30,
    color: '#ef4444',
  },
};

// Volatile data
export const Volatile: Story = {
  args: {
    data: [20, 40, 15, 50, 10, 45, 30, 60, 25, 55],
    width: 120,
    height: 40,
    color: '#f59e0b',
  },
};

// Custom color
export const CustomColor: Story = {
  args: {
    data: [30, 25, 35, 20, 40, 30, 45, 35, 50],
    width: 100,
    height: 30,
    color: '#8b5cf6',
  },
};

// Small size
export const SmallSize: Story = {
  args: {
    data: [10, 20, 15, 25, 20],
    width: 60,
    height: 20,
    color: '#6366f1',
  },
};

// Large size
export const LargeSize: Story = {
  args: {
    data: [10, 20, 15, 25, 30, 20, 35, 40, 30, 45, 35, 50],
    width: 200,
    height: 60,
    color: '#3b82f6',
  },
};

// Empty data
export const EmptyData: Story = {
  args: {
    data: [],
    width: 80,
    height: 24,
    color: '#6366f1',
  },
};

