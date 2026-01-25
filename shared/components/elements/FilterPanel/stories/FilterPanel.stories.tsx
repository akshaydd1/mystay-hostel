import type { Meta, StoryObj } from '@storybook/react';
import FilterPanel from '../FilterPanel';
import { useState } from 'react';

const meta: Meta<typeof FilterPanel> = {
  title: 'Components/Elements/FilterPanel/FilterPanel',
  component: FilterPanel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A filter panel component with sidebar navigation and filter options. Supports checkbox and radio button filters with apply/reset functionality.',
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
      description: 'Callback when filters are applied',
    },
    onReset: {
      action: 'reset',
      description: 'Callback when filters are reset',
    },
    animate: {
      control: 'boolean',
      description: 'Enable slide-down animation',
    },
    initialFilters: {
      control: 'object',
      description: 'Initial filter state',
    },
    sections: {
      control: 'object',
      description: 'Custom filter sections',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FilterPanel>;

// Default panel
export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Close clicked'),
    onApply: (filters) => console.log('Applied:', filters),
    onReset: () => console.log('Reset clicked'),
  },
};

// With initial filters
export const WithInitialFilters: Story = {
  args: {
    isOpen: true,
    initialFilters: {
      holdingPeriod: ['upto_1_month'],
      action: ['buy'],
      mcap: ['large_cap'],
    },
    onApply: (filters) => console.log('Applied:', filters),
    onReset: () => console.log('Reset clicked'),
  },
};

// Custom sections
export const CustomSections: Story = {
  args: {
    isOpen: true,
    sections: [
      {
        id: 'category',
        label: 'Category',
        type: 'checkbox',
        options: [
          { label: 'Electronics', value: 'electronics' },
          { label: 'Clothing', value: 'clothing' },
          { label: 'Books', value: 'books' },
        ],
      },
      {
        id: 'price',
        label: 'Price Range',
        type: 'radio',
        options: [
          { label: 'Under $50', value: 'under_50' },
          { label: '$50 - $100', value: '50_100' },
          { label: 'Over $100', value: 'over_100' },
        ],
      },
    ],
    onApply: (filters) => console.log('Applied:', filters),
    onReset: () => console.log('Reset clicked'),
  },
};

// Interactive example
export const Interactive: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true);
    const [appliedFilters, setAppliedFilters] = useState<Record<string, string[]>>({});

    return (
      <div className="space-y-4">
        <div className="p-4 bg-gray-100 rounded">
          <p className="text-sm font-semibold mb-2">Applied Filters:</p>
          <pre className="text-xs bg-white p-2 rounded overflow-auto">
            {JSON.stringify(appliedFilters, null, 2)}
          </pre>
        </div>
        <FilterPanel
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onApply={(filters) => {
            setAppliedFilters(filters);
            args.onApply?.(filters);
          }}
          onReset={() => {
            setAppliedFilters({});
            args.onReset?.();
          }}
        />
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Open Filter Panel
          </button>
        )}
      </div>
    );
  },
  args: {
    isOpen: true,
  },
};

// Without animation
export const NoAnimation: Story = {
  args: {
    isOpen: true,
    animate: false,
    onApply: (filters) => console.log('Applied:', filters),
    onReset: () => console.log('Reset clicked'),
  },
};

