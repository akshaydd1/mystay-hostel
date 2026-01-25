import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TabToggle, TabToggleOption } from '../TabToggle';

/**
 * TabToggle - Segmented control toggle component
 * 
 * A connected bordered button toggle component with active state highlighting.
 * Ideal for binary choices or status toggles with visual feedback.
 * Supports custom colors per option for status-based toggles.
 * 
 * **When to use:**
 * - Binary or multi-option toggles (2-4 options)
 * - Status filters (Active/Inactive, Buy/Sell, etc.)
 * - View mode switches (List/Grid, Chart/Table)
 * - Time period selectors (Day/Week/Month)
 * 
 * **When not to use:**
 * - For 5+ options (use TabNavigation or dropdown instead)
 * - For primary navigation (use TabNavigation)
 * - For forms with many fields (use radio buttons)
 */
const meta: Meta<typeof TabToggle> = {
  title: 'Elements/TabToggle',
  component: TabToggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A segmented control toggle for switching between 2-4 options with visual active state.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: 'object',
      description: 'Array of toggle options',
      table: {
        type: { summary: 'TabToggleOption[]' },
      },
    },
    value: {
      control: 'text',
      description: 'Currently selected option value',
      table: {
        type: { summary: 'string' },
      },
    },
    onChange: {
      description: 'Callback when selection changes',
      table: {
        type: { summary: '(value: string) => void' },
      },
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for screen readers',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Tab selector' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
      table: {
        type: { summary: 'string' },
      },
    },
    size: {
      control: 'radio',
      options: ['auto', 'fixed'],
      description: 'Size variant - affects width per button',
      table: {
        type: { summary: "'auto' | 'fixed'" },
        defaultValue: { summary: 'auto' },
      },
    },
    buttonWidth: {
      control: 'text',
      description: 'Fixed width per button when size="fixed"',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'w-[74px]' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TabToggle>;

// Wrapper component for interactive stories
const TabToggleWrapper = (args: any) => {
  const [value, setValue] = useState(args.value);
  return <TabToggle {...args} value={value} onChange={setValue} />;
};

const binaryOptions: TabToggleOption[] = [
  { value: 'buy', label: 'Buy' },
  { value: 'sell', label: 'Sell' },
];

const statusOptions: TabToggleOption[] = [
  { value: 'active', label: 'Active', activeColor: 'bg-mo-green-success' },
  { value: 'inactive', label: 'Inactive', activeColor: 'bg-mo-red-error' },
];

const viewModeOptions: TabToggleOption[] = [
  { value: 'list', label: 'List' },
  { value: 'grid', label: 'Grid' },
];

const timePeriodOptions: TabToggleOption[] = [
  { value: '1d', label: '1D' },
  { value: '1w', label: '1W' },
  { value: '1m', label: '1M' },
  { value: '3m', label: '3M' },
];

const tradingStatusOptions: TabToggleOption[] = [
  { value: 'all', label: 'All' },
  { value: 'open', label: 'Open', activeColor: 'bg-mo-green-success' },
  { value: 'closed', label: 'Closed', activeColor: 'bg-mo-gray' },
];

/**
 * Default binary toggle (Buy/Sell)
 */
export const Default: Story = {
  render: TabToggleWrapper,
  args: {
    options: binaryOptions,
    value: 'buy',
    ariaLabel: 'Trade action selector',
  },
};

/**
 * Status toggle with custom colors (Active/Inactive)
 */
export const StatusToggle: Story = {
  render: TabToggleWrapper,
  args: {
    options: statusOptions,
    value: 'active',
    ariaLabel: 'Status filter',
  },
};

/**
 * View mode toggle (List/Grid)
 */
export const ViewMode: Story = {
  render: TabToggleWrapper,
  args: {
    options: viewModeOptions,
    value: 'list',
    ariaLabel: 'View mode selector',
  },
};

/**
 * Time period selector with 4 options
 */
export const TimePeriod: Story = {
  render: TabToggleWrapper,
  args: {
    options: timePeriodOptions,
    value: '1d',
    ariaLabel: 'Time period selector',
  },
};

/**
 * Trading status toggle with mixed colors
 */
export const TradingStatus: Story = {
  render: TabToggleWrapper,
  args: {
    options: tradingStatusOptions,
    value: 'all',
    ariaLabel: 'Trading status filter',
  },
};

/**
 * Fixed width buttons (consistent sizing)
 */
export const FixedWidth: Story = {
  render: TabToggleWrapper,
  args: {
    options: binaryOptions,
    value: 'buy',
    size: 'fixed',
    buttonWidth: 'w-[100px]',
    ariaLabel: 'Trade action selector',
  },
};

/**
 * Auto width buttons (content-based sizing)
 */
export const AutoWidth: Story = {
  render: TabToggleWrapper,
  args: {
    options: [
      { value: 'short', label: 'Go' },
      { value: 'long', label: 'Extended Option' },
    ],
    value: 'short',
    size: 'auto',
    ariaLabel: 'Option selector',
  },
};

/**
 * Three options toggle
 */
export const ThreeOptions: Story = {
  render: TabToggleWrapper,
  args: {
    options: [
      { value: 'low', label: 'Low' },
      { value: 'medium', label: 'Medium' },
      { value: 'high', label: 'High' },
    ],
    value: 'medium',
    ariaLabel: 'Risk level selector',
  },
};

/**
 * With long labels
 */
export const LongLabels: Story = {
  render: TabToggleWrapper,
  args: {
    options: [
      { value: 'individual', label: 'Individual' },
      { value: 'corporate', label: 'Corporate' },
    ],
    value: 'individual',
    ariaLabel: 'Account type selector',
  },
};

/**
 * Keyboard navigation demo
 */
export const KeyboardNavigation: Story = {
  render: TabToggleWrapper,
  args: {
    options: timePeriodOptions,
    value: '1d',
    ariaLabel: 'Time period selector',
  },
  parameters: {
    docs: {
      description: {
        story: 'Use Arrow Left/Right keys to navigate between options. Use Enter or Space to select.',
      },
    },
  },
};
