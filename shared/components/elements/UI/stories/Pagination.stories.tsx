import type { Meta, StoryObj } from '@storybook/react';
import Pagination from '../Pagination';
import { useState } from 'react';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Elements/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A pagination component with page numbers, previous/next buttons, and ellipsis for large page counts. Supports customizable visible page count.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    currentPage: {
      control: 'number',
      description: 'Current active page number',
    },
    totalPages: {
      control: 'number',
      description: 'Total number of pages',
    },
    onPageChange: {
      action: 'page-changed',
      description: 'Callback when a page number is clicked',
    },
    onPrevious: {
      action: 'previous-clicked',
      description: 'Callback when previous button is clicked',
    },
    onNext: {
      action: 'next-clicked',
      description: 'Callback when next button is clicked',
    },
    canPrevious: {
      control: 'boolean',
      description: 'Whether previous button should be enabled',
    },
    canNext: {
      control: 'boolean',
      description: 'Whether next button should be enabled',
    },
    maxVisiblePages: {
      control: 'number',
      description: 'Maximum number of page buttons to show',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

// Interactive pagination
const InteractivePagination = (args: Story['args']) => {
  const [currentPage, setCurrentPage] = useState(args?.currentPage || 1);
  const totalPages = args?.totalPages || 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    args?.onPageChange?.(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      args?.onPrevious?.();
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      args?.onNext?.();
    }
  };

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      onPrevious={handlePrevious}
      onNext={handleNext}
      canPrevious={currentPage > 1}
      canNext={currentPage < totalPages}
      maxVisiblePages={args?.maxVisiblePages}
    />
  );
};

// Small pagination
export const Small: Story = {
  render: InteractivePagination,
  args: {
    currentPage: 1,
    totalPages: 5,
    maxVisiblePages: 5,
  },
};

// Medium pagination
export const Medium: Story = {
  render: InteractivePagination,
  args: {
    currentPage: 5,
    totalPages: 10,
    maxVisiblePages: 5,
  },
};

// Large pagination
export const Large: Story = {
  render: InteractivePagination,
  args: {
    currentPage: 10,
    totalPages: 20,
    maxVisiblePages: 5,
  },
};

// Very large pagination
export const VeryLarge: Story = {
  render: InteractivePagination,
  args: {
    currentPage: 50,
    totalPages: 100,
    maxVisiblePages: 5,
  },
};

// First page
export const FirstPage: Story = {
  render: InteractivePagination,
  args: {
    currentPage: 1,
    totalPages: 10,
    maxVisiblePages: 5,
  },
};

// Last page
export const LastPage: Story = {
  render: InteractivePagination,
  args: {
    currentPage: 10,
    totalPages: 10,
    maxVisiblePages: 5,
  },
};

// Custom visible pages
export const CustomVisiblePages: Story = {
  render: InteractivePagination,
  args: {
    currentPage: 15,
    totalPages: 30,
    maxVisiblePages: 7,
  },
};

// Single page
export const SinglePage: Story = {
  render: InteractivePagination,
  args: {
    currentPage: 1,
    totalPages: 1,
    maxVisiblePages: 5,
  },
};

