import type { Meta, StoryObj } from '@storybook/react';
import SortPanel from '../SortPanel';
import { useState } from 'react';

const meta: Meta<typeof SortPanel> = {
  title: 'Components/Elements/SortPanel/SortPanel',
  component: SortPanel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A sort panel component for selecting sort options. Supports different contexts (stocks, baskets, etc.) with custom sort options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the panel is open',
    },
    onClose: {
      action: 'closed',
      description: 'Callback when panel is closed',
    },
    onApply: {
      action: 'applied',
      description: 'Callback when sort is applied',
    },
    onReset: {
      action: 'reset',
      description: 'Callback when sort is reset',
    },
    defaultSort: {
      control: 'text',
      description: 'Default sort value',
    },
    context: {
      control: 'select',
      options: ['stocks', 'baskets', 'reports', 'ratings', 'consensus', 'default'],
      description: 'Sort context',
    },
    options: {
      control: 'object',
      description: 'Custom sort options',
    },
    animate: {
      control: 'boolean',
      description: 'Enable slide-down animation',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SortPanel>;

// Default stocks context
export const StocksContext: Story = {
  args: {
    isOpen: true,
    context: 'stocks',
    defaultSort: 'latest',
    onApply: (sort) => console.log('Applied sort:', sort),
    onReset: () => console.log('Reset clicked'),
  },
};

// Baskets context
export const BasketsContext: Story = {
  args: {
    isOpen: true,
    context: 'baskets',
    defaultSort: 'latest-baskets',
    onApply: (sort) => console.log('Applied sort:', sort),
    onReset: () => console.log('Reset clicked'),
  },
};

// Custom options
export const CustomOptions: Story = {
  args: {
    isOpen: true,
    options: [
      { label: 'Name A-Z', value: 'name-asc' },
      { label: 'Name Z-A', value: 'name-desc' },
      { label: 'Date Newest', value: 'date-desc' },
      { label: 'Date Oldest', value: 'date-asc' },
      { label: 'Price Low-High', value: 'price-asc' },
      { label: 'Price High-Low', value: 'price-desc' },
    ],
    defaultSort: 'name-asc',
    onApply: (sort) => console.log('Applied sort:', sort),
    onReset: () => console.log('Reset clicked'),
  },
};

// Interactive example
export const Interactive: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true);
    const [selectedSort, setSelectedSort] = useState('latest');

    return (
      <div className="space-y-4">
        <div className="p-4 bg-gray-100 rounded">
          <p className="text-sm font-semibold mb-2">Selected Sort:</p>
          <p className="text-sm">{selectedSort}</p>
        </div>
        <SortPanel
          {...args}
          isOpen={isOpen}
          defaultSort={selectedSort}
          onClose={() => setIsOpen(false)}
          onApply={(sort) => {
            setSelectedSort(sort);
            args.onApply?.(sort);
          }}
          onReset={() => {
            setSelectedSort(args.defaultSort || 'latest');
            args.onReset?.();
          }}
        />
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Open Sort Panel
          </button>
        )}
      </div>
    );
  },
  args: {
    isOpen: true,
    context: 'stocks',
    defaultSort: 'latest',
  },
};

// Without animation
export const NoAnimation: Story = {
  args: {
    isOpen: true,
    animate: false,
    context: 'stocks',
    onApply: (sort) => console.log('Applied sort:', sort),
    onReset: () => console.log('Reset clicked'),
  },
};

// Reports context (empty - should not render)
export const ReportsContext: Story = {
  args: {
    isOpen: true,
    context: 'reports',
    onApply: (sort) => console.log('Applied sort:', sort),
    onReset: () => console.log('Reset clicked'),
  },
};

