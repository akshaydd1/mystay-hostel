import type { Meta, StoryObj } from '@storybook/react';
import Chips from '../TagChips';

const meta: Meta<typeof Chips> = {
  title: 'Components/Elements/TagChips',
  component: Chips,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A chip/tag component that displays a label with optional count. Supports different sizes and active states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Chip label text',
    },
    count: {
      control: 'number',
      description: 'Optional count to display',
    },
    isActive: {
      control: 'boolean',
      description: 'Whether the chip is in active state',
    },
    variant: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant of the chip',
    },
    onClick: {
      action: 'clicked',
      description: 'Callback when chip is clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Chips>;

// Default chip
export const Default: Story = {
  args: {
    label: 'Technology',
    variant: 'md',
    isActive: false,
  },
};

// Active chip
export const Active: Story = {
  args: {
    label: 'Active Chip',
    variant: 'md',
    isActive: true,
  },
};

// With count
export const WithCount: Story = {
  args: {
    label: 'Notifications',
    count: 5,
    variant: 'md',
    isActive: false,
  },
};

// Active with count
export const ActiveWithCount: Story = {
  args: {
    label: 'Messages',
    count: 12,
    variant: 'md',
    isActive: true,
  },
};

// Size variants
export const Small: Story = {
  args: {
    label: 'Small',
    variant: 'sm',
    isActive: false,
  },
};

export const Medium: Story = {
  args: {
    label: 'Medium',
    variant: 'md',
    isActive: false,
  },
};

export const Large: Story = {
  args: {
    label: 'Large',
    variant: 'lg',
    isActive: false,
  },
};

// Interactive
export const Interactive: Story = {
  args: {
    label: 'Click me',
    variant: 'md',
    isActive: false,
    onClick: () => alert('Chip clicked!'),
  },
};

