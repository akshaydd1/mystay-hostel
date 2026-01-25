import type { Meta, StoryObj } from '@storybook/react';
import CapsuleTab from '../CapsuleTab';

const meta: Meta<typeof CapsuleTab> = {
  title: 'Components/Elements/CapsuleTab',
  component: CapsuleTab,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `A capsule-style tab component following the MOFSL design system. 
        
Features:
- Light purple/blue background with border (\`#edeefc\` with \`#c4c5f3\` border)
- Active tab has white background with primary blue text (\`#2b2e8c\`)
- Inactive tabs have transparent background with muted gray text (\`#727279\`)
- Rounded corners with smooth transitions
- Accessible with ARIA attributes
- Keyboard navigation support

Uses a render prop pattern to display content based on the active tab.`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    tabs: {
      control: 'object',
      description: 'Array of tab keys (strings)',
      table: {
        type: { summary: 'readonly T[]' },
      },
    },
    labels: {
      control: 'object',
      description: 'Optional custom labels for tabs. If not provided, tab keys will be used as labels.',
      table: {
        type: { summary: 'Record<T, string>' },
      },
    },
    defaultTab: {
      control: 'text',
      description: 'Default active tab. If not provided, the first tab will be active.',
      table: {
        type: { summary: 'T' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the container',
      table: {
        type: { summary: 'string' },
      },
    },
    tabClassName: {
      control: 'text',
      description: 'Additional CSS classes for the tab container',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CapsuleTab>;

// Stock Performance Tabs (from Figma design)
export const StockPerformanceTabs: Story = {
  args: {
    tabs: ['priceChart', 'pricePerformance', 'volumeAnalysis'] as const,
    labels: {
      priceChart: 'Price Chart',
      pricePerformance: 'Price Performance',
      volumeAnalysis: 'Volume Analysis',
    },
    defaultTab: 'pricePerformance',
    children: (activeTab) => (
      <div className="p-6 border border-gray-200 rounded-lg bg-white min-w-[545px]">
        <h3 className="font-semibold text-lg mb-4">
          {activeTab === 'priceChart' && 'Price Chart'}
          {activeTab === 'pricePerformance' && 'Price Performance'}
          {activeTab === 'volumeAnalysis' && 'Volume Analysis'}
        </h3>
        <p className="text-gray-600">
          {activeTab === 'priceChart' && 'Chart view showing price trends over time'}
          {activeTab === 'pricePerformance' && 'Detailed performance metrics and returns'}
          {activeTab === 'volumeAnalysis' && 'Trading volume analysis and patterns'}
        </p>
      </div>
    ),
  },
};

// Two tabs
export const TwoTabs: Story = {
  args: {
    tabs: ['list', 'grid'] as const,
    labels: {
      list: 'List',
      grid: 'Grid',
    },
    defaultTab: 'list',
    children: (activeTab) => (
      <div className="p-4 border rounded bg-white min-w-[300px]">
        <p>Active tab: <strong>{activeTab}</strong></p>
        <p className="mt-2 text-gray-600">Content for {activeTab} view</p>
      </div>
    ),
  },
};

// Three tabs
export const ThreeTabs: Story = {
  args: {
    tabs: ['all', 'active', 'completed'] as const,
    labels: {
      all: 'All',
      active: 'Active',
      completed: 'Completed',
    },
    defaultTab: 'all',
    children: (activeTab) => (
      <div className="p-4 border rounded min-w-[300px] bg-white">
        <p>Showing: <strong>{activeTab}</strong> items</p>
        <ul className="mt-3 space-y-2 text-gray-600">
          <li>• Item 1</li>
          <li>• Item 2</li>
          <li>• Item 3</li>
        </ul>
      </div>
    ),
  },
};

// Four tabs with wider container
export const FourTabs: Story = {
  args: {
    tabs: ['overview', 'analytics', 'reports', 'settings'] as const,
    labels: {
      overview: 'Overview',
      analytics: 'Analytics',
      reports: 'Reports',
      settings: 'Settings',
    },
    defaultTab: 'overview',
    children: (activeTab) => (
      <div className="p-6 border rounded bg-white min-w-[600px]">
        <h3 className="font-semibold mb-2">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </h3>
        <p className="text-gray-600">Content for {activeTab} section</p>
      </div>
    ),
  },
};

// Without custom labels
export const DefaultLabels: Story = {
  args: {
    tabs: ['tab1', 'tab2', 'tab3'] as const,
    defaultTab: 'tab1',
    children: (activeTab) => (
      <div className="p-4 border rounded bg-white min-w-[300px]">
        <p>Active: <strong>{activeTab}</strong></p>
        <p className="text-gray-600 mt-2">Tab keys are used as labels when labels prop is not provided</p>
      </div>
    ),
  },
};

// Custom content with different views
export const CustomContent: Story = {
  args: {
    tabs: ['overview', 'details'] as const,
    labels: {
      overview: 'Overview',
      details: 'Details',
    },
    defaultTab: 'overview',
    children: (activeTab) => {
      if (activeTab === 'overview') {
        return (
          <div className="p-6 border rounded bg-blue-50 min-w-[400px]">
            <h3 className="font-bold mb-2">Overview</h3>
            <p className="text-gray-700">This is the overview content with some details about the current state.</p>
            <div className="mt-4 flex gap-4">
              <div className="flex-1 p-3 bg-white rounded">
                <p className="text-xs text-gray-500">Total Users</p>
                <p className="text-xl font-bold">1,234</p>
              </div>
              <div className="flex-1 p-3 bg-white rounded">
                <p className="text-xs text-gray-500">Active</p>
                <p className="text-xl font-bold text-green-600">856</p>
              </div>
            </div>
          </div>
        );
      }
      return (
        <div className="p-6 border rounded bg-green-50 min-w-[400px]">
          <h3 className="font-bold mb-2">Details</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Detail item 1: Processing</li>
            <li>Detail item 2: Completed</li>
            <li>Detail item 3: Pending</li>
          </ul>
        </div>
      );
    },
  },
};

// With custom tab container styling
export const CustomStyling: Story = {
  args: {
    tabs: ['compact', 'comfortable', 'spacious'] as const,
    labels: {
      compact: 'Compact',
      comfortable: 'Comfortable',
      spacious: 'Spacious',
    },
    defaultTab: 'comfortable',
    tabClassName: 'w-full',
    className: 'w-full max-w-2xl',
    children: (activeTab) => (
      <div className="p-6 border rounded bg-white">
        <p className="font-medium">View mode: <strong>{activeTab}</strong></p>
        <p className="text-gray-600 mt-2">
          {activeTab === 'compact' && 'Compact view shows condensed information'}
          {activeTab === 'comfortable' && 'Comfortable view balances information and whitespace'}
          {activeTab === 'spacious' && 'Spacious view provides maximum readability'}
        </p>
      </div>
    ),
  },
};

