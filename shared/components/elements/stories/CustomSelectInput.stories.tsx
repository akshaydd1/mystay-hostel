import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import CustomSelectInput, { SelectOption } from '../CustomSelectInput';

/**
 * CustomSelectInput - Creatable select input component
 * 
 * A flexible select/dropdown component built with react-select/creatable.
 * Supports single and multi-selection, custom option creation, and various input formats.
 * 
 * **Features:**
 * - Single or multi-selection mode
 * - Create new options on-the-fly
 * - Supports string[], object[], or SelectOption[] inputs
 * - Custom option extractors
 * - Clearable and searchable
 * - Fully styled with Tailwind CSS
 * 
 * **When to use:**
 * - Dropdowns with many options
 * - Tag/category selection
 * - Location pickers (city, state, etc.)
 * - Dynamic option creation
 * - Multi-select scenarios
 * 
 * **When not to use:**
 * - For 2-3 options (use radio buttons or TabToggle)
 * - For binary choices (use checkbox or toggle)
 * - For very simple static lists (use native select)
 */
const meta: Meta<typeof CustomSelectInput> = {
  title: 'Elements/CustomSelectInput',
  component: CustomSelectInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A flexible creatable select component with single/multi-selection support and custom option creation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'object',
      description: 'Current selected value(s)',
      table: {
        type: { summary: 'SelectOption | SelectOption[] | null' },
      },
    },
    options: {
      control: 'object',
      description: 'Available options (SelectOption[], string[], or object[])',
      table: {
        type: { summary: 'SelectOption[] | string[] | Record<string, any>[]' },
      },
    },
    onChange: {
      description: 'Callback when selection changes',
      table: {
        type: { summary: '(value: SelectOption | SelectOption[] | null) => void' },
      },
    },
    onCreateOption: {
      description: 'Callback when new option is created',
      table: {
        type: { summary: '(label: string, newOption: SelectOption) => void | boolean' },
      },
    },
    isMulti: {
      control: 'boolean',
      description: 'Enable multi-selection mode',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the select input',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Select...' },
      },
    },
    isClearable: {
      control: 'boolean',
      description: 'Allow clearing selection',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Render full width',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CustomSelectInput>;

// Wrapper component for interactive stories
const SelectWrapper = (args: any) => {
  const [value, setValue] = useState<SelectOption | SelectOption[] | null>(args.value || null);
  
  return (
    <div className="min-w-[300px]">
      <CustomSelectInput {...args} value={value} onChange={setValue} />
      <div className="mt-4 p-3 bg-mo-bg-light rounded text-sm">
        <strong>Selected:</strong> {value ? JSON.stringify(value, null, 2) : 'None'}
      </div>
    </div>
  );
};

const stockOptions: SelectOption[] = [
  { label: 'Reliance Industries', value: 'RELIANCE' },
  { label: 'Tata Consultancy Services', value: 'TCS' },
  { label: 'HDFC Bank', value: 'HDFCBANK' },
  { label: 'Infosys', value: 'INFY' },
  { label: 'ICICI Bank', value: 'ICICIBANK' },
  { label: 'State Bank of India', value: 'SBIN' },
  { label: 'Bharti Airtel', value: 'BHARTIARTL' },
  { label: 'ITC Ltd', value: 'ITC' },
];

const cityStrings = [
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Hyderabad',
  'Chennai',
  'Kolkata',
  'Pune',
  'Ahmedabad',
];

const categoryOptions: SelectOption[] = [
  { label: 'Technology', value: 'tech' },
  { label: 'Banking', value: 'bank' },
  { label: 'Pharma', value: 'pharma' },
  { label: 'Energy', value: 'energy' },
];

/**
 * Default single selection with stock options
 */
export const Default: Story = {
  render: SelectWrapper,
  args: {
    options: stockOptions,
    placeholder: 'Select a stock...',
    isMulti: false,
  },
};

/**
 * Multi-selection mode
 */
export const MultiSelect: Story = {
  render: SelectWrapper,
  args: {
    options: stockOptions,
    placeholder: 'Select multiple stocks...',
    isMulti: true,
  },
};

/**
 * With string array options (automatically converted)
 */
export const StringArrayOptions: Story = {
  render: SelectWrapper,
  args: {
    options: cityStrings,
    placeholder: 'Select a city...',
    isMulti: false,
  },
};

/**
 * Creatable - allows creating new options
 */
export const Creatable: Story = {
  render: (args) => {
    const [value, setValue] = useState<SelectOption | SelectOption[] | null>(null);
    const [options, setOptions] = useState<SelectOption[]>(categoryOptions);
    
    return (
      <div className="min-w-[300px]">
        <CustomSelectInput 
          {...args} 
          value={value} 
          onChange={setValue}
          options={options}
          onCreateOption={(label, newOption) => {
            setOptions([...options, newOption]);
            console.log('Created new option:', newOption);
          }}
        />
        <div className="mt-4 p-3 bg-mo-bg-light rounded text-sm">
          <strong>Selected:</strong> {value ? JSON.stringify(value) : 'None'}
        </div>
      </div>
    );
  },
  args: {
    placeholder: 'Select or create category...',
    isMulti: false,
  },
};

/**
 * Multi-select creatable
 */
export const MultiCreatable: Story = {
  render: (args) => {
    const [value, setValue] = useState<SelectOption | SelectOption[] | null>([]);
    const [options, setOptions] = useState<string[]>(cityStrings);
    
    return (
      <div className="min-w-[300px]">
        <CustomSelectInput 
          {...args} 
          value={value} 
          onChange={setValue}
          options={options}
          onCreateOption={(label, newOption) => {
            setOptions([...options, label]);
            console.log('Created new city:', label);
          }}
        />
        <div className="mt-4 p-3 bg-mo-bg-light rounded text-sm">
          <strong>Selected:</strong> {JSON.stringify(value)}
        </div>
      </div>
    );
  },
  args: {
    placeholder: 'Select or add cities...',
    isMulti: true,
  },
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  render: SelectWrapper,
  args: {
    options: stockOptions,
    placeholder: 'Disabled select',
    disabled: true,
    value: stockOptions[0],
  },
};

/**
 * Loading state
 */
export const Loading: Story = {
  render: SelectWrapper,
  args: {
    options: stockOptions,
    placeholder: 'Loading...',
    loading: true,
  },
};

/**
 * Not clearable
 */
export const NotClearable: Story = {
  render: SelectWrapper,
  args: {
    options: stockOptions,
    placeholder: 'Select a stock...',
    isClearable: false,
    value: stockOptions[0],
  },
};

/**
 * With pre-selected value
 */
export const PreSelected: Story = {
  render: SelectWrapper,
  args: {
    options: stockOptions,
    placeholder: 'Select a stock...',
    value: stockOptions[2],
  },
};

/**
 * Multi-select with pre-selected values
 */
export const PreSelectedMulti: Story = {
  render: SelectWrapper,
  args: {
    options: stockOptions,
    placeholder: 'Select stocks...',
    isMulti: true,
    value: [stockOptions[0], stockOptions[2], stockOptions[4]],
  },
};

/**
 * Custom width (not full width)
 */
export const CustomWidth: Story = {
  render: SelectWrapper,
  args: {
    options: categoryOptions,
    placeholder: 'Category...',
    fullWidth: false,
    className: 'w-64',
  },
};

/**
 * With object array options (auto-extracted)
 */
export const ObjectArrayOptions: Story = {
  render: SelectWrapper,
  args: {
    options: [
      { stateName: 'Maharashtra', id: 'MH' },
      { stateName: 'Karnataka', id: 'KA' },
      { stateName: 'Tamil Nadu', id: 'TN' },
      { stateName: 'Gujarat', id: 'GJ' },
    ],
    placeholder: 'Select state...',
    isMulti: false,
  },
};
