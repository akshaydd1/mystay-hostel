import type { Meta, StoryObj } from '@storybook/react';
import ChartDonutPie from '../ChartDonutPie';

const meta: Meta<typeof ChartDonutPie> = {
  title: 'Components/Elements/CustomCharts/ChartDonutPie',
  component: ChartDonutPie,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A donut or pie chart component built with Chart.js. Supports custom colors, labels, and legend positioning.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['doughnut', 'pie'],
      description: 'Chart type',
    },
    labels: {
      control: 'object',
      description: 'Data labels',
    },
    data: {
      control: 'object',
      description: 'Data values',
    },
    colors: {
      control: 'object',
      description: 'Custom colors for segments',
    },
    legendPosition: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Legend position',
    },
    showLegend: {
      control: 'boolean',
      description: 'Whether to show legend',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ChartDonutPie>;

// Donut chart
export const Donut: Story = {
  args: {
    type: 'doughnut',
    labels: ['QIB', 'NIB', 'Retail', 'Employee', 'Others'],
    data: [30, 25, 20, 15, 10],
    showLegend: true,
    legendPosition: 'right',
  },
};

// Pie chart
export const Pie: Story = {
  args: {
    type: 'pie',
    labels: ['Category A', 'Category B', 'Category C', 'Category D'],
    data: [40, 30, 20, 10],
    showLegend: true,
    legendPosition: 'bottom',
  },
};

// Custom colors
export const CustomColors: Story = {
  args: {
    type: 'doughnut',
    labels: ['Red', 'Blue', 'Green', 'Yellow', 'Purple'],
    data: [25, 20, 30, 15, 10],
    colors: ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'],
    showLegend: true,
    legendPosition: 'right',
  },
};

// Without legend
export const NoLegend: Story = {
  args: {
    type: 'doughnut',
    labels: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
    data: [35, 25, 25, 15],
    showLegend: false,
  },
};

// Equal distribution
export const EqualDistribution: Story = {
  args: {
    type: 'pie',
    labels: ['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4'],
    data: [25, 25, 25, 25],
    showLegend: true,
    legendPosition: 'top',
  },
};

// Large dataset
export const LargeDataset: Story = {
  args: {
    type: 'doughnut',
    labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    data: [20, 15, 18, 12, 10, 15, 10],
    showLegend: true,
    legendPosition: 'right',
  },
};

