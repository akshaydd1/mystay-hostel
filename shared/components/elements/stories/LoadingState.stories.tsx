import type { Meta, StoryObj } from '@storybook/react';
import { LoadingState } from '../LoadingState';

const meta: Meta<typeof LoadingState> = {
  title: 'Components/Elements/LoadingState',
  component: LoadingState,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A reusable loading indicator component that supports both spinner and skeleton loading states. Includes accessibility features with aria-live regions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: 'text',
      description: 'Custom loading message (for screen readers)',
    },
    variant: {
      control: 'select',
      options: ['spinner', 'skeleton'],
      description: 'Loading variant type',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof LoadingState>;

// Default spinner
export const Default: Story = {
  args: {
    message: 'Loading...',
    variant: 'spinner',
  },
};

// Custom message
export const CustomMessage: Story = {
  args: {
    message: 'Fetching data...',
    variant: 'spinner',
  },
};

// Skeleton variant with custom skeleton
export const Skeleton: Story = {
  args: {
    variant: 'skeleton',
    skeleton: (
      <div className="space-y-4 w-96">
        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
        <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
      </div>
    ),
  },
};

// Skeleton for card layout
export const CardSkeleton: Story = {
  args: {
    variant: 'skeleton',
    skeleton: (
      <div className="border rounded-lg p-4 space-y-4 w-80">
        <div className="h-6 bg-gray-200 rounded w-2/3 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
        <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
      </div>
    ),
  },
};

