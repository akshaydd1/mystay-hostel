import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import FilterPopup from '../FilterPopup';
import Button from '../Button';

/**
 * FilterPopup - Modal filter component
 * 
 * A modal-based filter component with categories and options.
 * Features a two-panel design with category selection on the left and options on the right.
 * Supports both checkbox (multi-select) and radio (single-select) modes.
 * 
 * **Features:**
 * - Two-panel design (categories + options)
 * - Checkbox or radio button modes
 * - Reset and Apply actions
 * - Smooth animations and transitions
 * - Responsive design
 * 
 * **When to use:**
 * - Filtering lists or tables with multiple criteria
 * - Complex filter requirements with categories
 * - Mobile-friendly filter interfaces
 * 
 * **When not to use:**
 * - Simple 1-2 filter options (use FilterPanel instead)
 * - Inline filtering (use FilterPanel)
 * - For sorting (use SortPanel instead)
 */
const meta: Meta<typeof FilterPopup> = {
  title: 'Elements/FilterPopup',
  component: FilterPopup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A modal filter component with categorized options and multi/single selection modes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controls filter popup visibility',
      table: {
        type: { summary: 'boolean' },
      },
    },
    setOpen: {
      description: 'Callback to control popup state',
      table: {
        type: { summary: '(open: boolean) => void' },
      },
    },
    list: {
      control: 'object',
      description: 'Array of filter categories with options',
      table: {
        type: { summary: 'Category[]' },
      },
    },
    inputType: {
      control: 'radio',
      options: ['checkbox', 'radio'],
      description: 'Type of input (checkbox for multi-select, radio for single)',
      table: {
        type: { summary: "'checkbox' | 'radio'" },
        defaultValue: { summary: 'checkbox' },
      },
    },
    activeCheckedValues: {
      control: 'text',
      description: 'Comma-separated string of selected values',
      table: {
        type: { summary: 'string' },
      },
    },
    handleValueChange: {
      description: 'Callback when selection changes',
      table: {
        type: { summary: '(value: string) => void' },
      },
    },
    handleReset: {
      description: 'Callback when reset button is clicked',
      table: {
        type: { summary: '() => void' },
      },
    },
    handleApply: {
      description: 'Callback when apply button is clicked',
      table: {
        type: { summary: '(value: string) => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FilterPopup>;

// Wrapper component for interactive stories
const FilterPopupWrapper = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState('');
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Filters</Button>
      <FilterPopup 
        {...args} 
        open={isOpen} 
        setOpen={setIsOpen}
        activeCheckedValues={selectedValues}
        handleValueChange={setSelectedValues}
        handleApply={(value) => {
          console.log('Applied filters:', value);
          setIsOpen(false);
        }}
      />
      {selectedValues && (
        <div className="mt-4 p-3 bg-mo-bg-light rounded text-sm">
          <strong>Selected:</strong> {selectedValues || 'None'}
        </div>
      )}
    </>
  );
};

const stockFilters = [
  {
    label: 'Holding Period',
    options: [
      { label: 'Up to 1 Month', value: 'upto_1_month' },
      { label: 'Up to 6 Months', value: 'upto_6_months' },
      { label: '6-12 Months', value: '6_12_months' },
      { label: '1 Year+', value: '1_year_plus' },
    ],
  },
  {
    label: 'Buy/Sell',
    options: [
      { label: 'Buy', value: 'buy' },
      { label: 'Sell', value: 'sell' },
    ],
  },
  {
    label: 'Market Cap',
    options: [
      { label: 'Large Cap', value: 'large_cap' },
      { label: 'Mid Cap', value: 'mid_cap' },
      { label: 'Small Cap', value: 'small_cap' },
    ],
  },
  {
    label: 'Upside %',
    options: [
      { label: '0–10%', value: '0_10' },
      { label: '10–25%', value: '10_25' },
      { label: '25–50%', value: '25_50' },
      { label: '50%+', value: '50_plus' },
    ],
  },
  {
    label: 'Stock Price',
    options: [
      { label: '<₹100', value: 'lt_100' },
      { label: '₹100–₹500', value: '100_500' },
      { label: '₹500–₹1000', value: '500_1000' },
      { label: '₹1000–₹5000', value: '1000_5000' },
      { label: '₹5000+', value: '5000_plus' },
    ],
  },
];

const ipoFilters = [
  {
    label: 'Status',
    options: [
      { label: 'Open', value: 'open' },
      { label: 'Closed', value: 'closed' },
      { label: 'Upcoming', value: 'upcoming' },
    ],
  },
  {
    label: 'Subscription',
    options: [
      { label: 'Under-subscribed', value: 'under' },
      { label: 'Fully-subscribed', value: 'full' },
      { label: 'Over-subscribed', value: 'over' },
    ],
  },
  {
    label: 'Price Range',
    options: [
      { label: '<₹100', value: 'lt_100' },
      { label: '₹100-₹500', value: '100_500' },
      { label: '₹500-₹1000', value: '500_1000' },
      { label: '₹1000+', value: '1000_plus' },
    ],
  },
];

/**
 * Default filter popup with checkbox mode (multi-select)
 */
export const Default: Story = {
  render: FilterPopupWrapper,
  args: {
    list: stockFilters,
    inputType: 'checkbox',
  },
};

/**
 * Radio button mode (single selection)
 */
export const RadioMode: Story = {
  render: FilterPopupWrapper,
  args: {
    list: ipoFilters,
    inputType: 'radio',
  },
};

/**
 * IPO filters
 */
export const IPOFilters: Story = {
  render: FilterPopupWrapper,
  args: {
    list: ipoFilters,
    inputType: 'checkbox',
  },
};

/**
 * Minimal filters (2 categories)
 */
export const MinimalFilters: Story = {
  render: FilterPopupWrapper,
  args: {
    list: [
      {
        label: 'Type',
        options: [
          { label: 'Equity', value: 'equity' },
          { label: 'Debt', value: 'debt' },
          { label: 'Hybrid', value: 'hybrid' },
        ],
      },
      {
        label: 'Risk',
        options: [
          { label: 'Low', value: 'low' },
          { label: 'Medium', value: 'medium' },
          { label: 'High', value: 'high' },
        ],
      },
    ],
    inputType: 'checkbox',
  },
};

/**
 * With pre-selected values
 */
export const PreSelected: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValues, setSelectedValues] = useState('buy,large_cap');
    
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Filters</Button>
        <FilterPopup 
          {...args} 
          open={isOpen} 
          setOpen={setIsOpen}
          activeCheckedValues={selectedValues}
          handleValueChange={setSelectedValues}
          handleApply={(value) => {
            console.log('Applied filters:', value);
            setIsOpen(false);
          }}
        />
        <div className="mt-4 p-3 bg-mo-bg-light rounded text-sm">
          <strong>Selected:</strong> {selectedValues || 'None'}
        </div>
      </>
    );
  },
  args: {
    list: stockFilters,
    inputType: 'checkbox',
  },
};
