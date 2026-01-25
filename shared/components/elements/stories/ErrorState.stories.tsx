import type { Meta, StoryObj } from '@storybook/react';
import { ErrorState } from '../ErrorState';

const meta: Meta<typeof ErrorState> = {
  title: 'Components/Elements/ErrorState',
  component: ErrorState,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A reusable error display component that shows error messages with a retry button. Includes accessibility features with aria-live regions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    error: {
      control: 'object',
      description: 'Error object or error message',
    },
    onRetry: {
      action: 'retry',
      description: 'Callback function when retry button is clicked',
    },
    userMessage: {
      control: 'text',
      description: 'User-friendly fallback message',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ErrorState>;

// Default error
export const Default: Story = {
  args: {
    error: new Error('Failed to load data'),
    onRetry: () => console.log('Retry clicked'),
  },
};

// Custom error message
export const CustomMessage: Story = {
  args: {
    error: new Error('Network request failed'),
    onRetry: () => console.log('Retry clicked'),
    userMessage: 'Unable to connect to the server. Please check your internet connection.',
  },
};

// Error with object
export const ErrorObject: Story = {
  args: {
    error: { message: 'API returned 500 Internal Server Error' },
    onRetry: () => console.log('Retry clicked'),
  },
};

// Long error message
export const LongErrorMessage: Story = {
  args: {
    error: new Error('This is a very long error message that might wrap to multiple lines to test how the component handles longer text content gracefully'),
    onRetry: () => console.log('Retry clicked'),
  },
};

