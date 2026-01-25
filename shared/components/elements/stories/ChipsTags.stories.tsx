import type { Meta, StoryObj } from '@storybook/react';
import ChipsTags from '../ChipsTags';

const meta: Meta<typeof ChipsTags> = {
  title: 'Components/Elements/ChipsTags',
  component: ChipsTags,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible chips/tags component that accepts strings or objects. Supports active state, disabled chips, and custom styling per chip.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    chips: {
      control: 'object',
      description: 'Array of chips (strings or objects)',
    },
    activeChip: {
      control: 'text',
      description: 'Currently active chip value',
    },
    onChipChange: {
      action: 'chip-changed',
      description: 'Callback when a chip is clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ChipsTags>;

// Simple string chips
export const StringChips: Story = {
  args: {
    chips: ['All', 'Active', 'Pending', 'Completed'],
    activeChip: 'All',
  },
};

// Object chips
export const ObjectChips: Story = {
  args: {
    chips: [
      { label: 'Technology', value: 'tech' },
      { label: 'Finance', value: 'finance' },
      { label: 'Healthcare', value: 'healthcare' },
      { label: 'Education', value: 'education' },
    ],
    activeChip: 'tech',
  },
};

// Mixed chips
export const MixedChips: Story = {
  args: {
    chips: [
      'All',
      { label: 'Category 1', value: 'cat1' },
      { label: 'Category 2', value: 'cat2' },
      'Recent',
    ],
    activeChip: 'All',
  },
};

// With disabled chips
export const WithDisabled: Story = {
  args: {
    chips: [
      { label: 'Available', value: 'available' },
      { label: 'Coming Soon', value: 'coming-soon', disabled: true },
      { label: 'Sold Out', value: 'sold-out', disabled: true },
      { label: 'Active', value: 'active' },
    ],
    activeChip: 'available',
  },
};

// Many chips
export const ManyChips: Story = {
  args: {
    chips: [
      'All',
      'Technology',
      'Finance',
      'Healthcare',
      'Education',
      'Retail',
      'Manufacturing',
      'Services',
    ],
    activeChip: 'Technology',
  },
  parameters: {
    layout: 'padded',
  },
};

// Uncontrolled mode
export const Uncontrolled: Story = {
  args: {
    chips: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
  },
};

