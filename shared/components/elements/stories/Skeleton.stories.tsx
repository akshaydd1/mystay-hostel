import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton, SkeletonText, SkeletonCircle, SkeletonCard, SkeletonAvatar } from '../Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Elements/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `A flexible, reusable skeleton loader component for creating loading placeholders.

**Features:**
- Multiple shape variants (rectangle, circle, rounded, text)
- Flexible sizing with Tailwind classes or custom values
- Animation options (pulse, wave, none)
- Support for multiple skeleton items with gap control
- Pre-configured components for common use cases

**When to use:**
- To indicate content is loading
- To maintain layout stability during data fetching
- For progressive content loading
- To improve perceived performance

**When not to use:**
- For instant data loads (< 300ms)
- When a spinner is more appropriate
- For error states (use ErrorState instead)`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['rectangle', 'circle', 'rounded', 'text'],
      description: 'Shape variant of the skeleton',
    },
    width: {
      control: 'text',
      description: 'Width (Tailwind class or custom value)',
    },
    height: {
      control: 'text',
      description: 'Height (Tailwind class or custom value)',
    },
    animation: {
      control: 'select',
      options: ['pulse', 'wave', 'none'],
      description: 'Animation type',
    },
    count: {
      control: 'number',
      description: 'Number of skeleton items',
    },
    bgColor: {
      control: 'text',
      description: 'Background color class',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

// Basic Variants
export const Default: Story = {
  args: {
    width: 'w-full',
    height: 'h-4',
  },
};

export const Rectangle: Story = {
  args: {
    variant: 'rectangle',
    width: 'w-64',
    height: 'h-32',
  },
};

export const Circle: Story = {
  args: {
    variant: 'circle',
    width: 'w-16',
    height: 'h-16',
  },
};

export const Rounded: Story = {
  args: {
    variant: 'rounded',
    width: 'w-64',
    height: 'h-48',
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
    width: 'w-48',
  },
};

// Animation Variants
export const PulseAnimation: Story = {
  args: {
    variant: 'rounded',
    width: 'w-64',
    height: 'h-32',
    animation: 'pulse',
  },
};

export const NoAnimation: Story = {
  args: {
    variant: 'rounded',
    width: 'w-64',
    height: 'h-32',
    animation: 'none',
  },
};

// Multiple Items
export const MultipleLines: Story = {
  args: {
    variant: 'text',
    width: 'w-full',
    count: 5,
  },
};

export const MultipleCircles: Story = {
  render: () => (
    <div className="flex gap-4">
      <Skeleton variant="circle" width="w-12" height="h-12" />
      <Skeleton variant="circle" width="w-12" height="h-12" />
      <Skeleton variant="circle" width="w-12" height="h-12" />
      <Skeleton variant="circle" width="w-12" height="h-12" />
    </div>
  ),
};

// Pre-configured Components
export const TextSkeleton: Story = {
  render: () => (
    <div className="space-y-2">
      <SkeletonText width="w-full" />
      <SkeletonText width="w-3/4" />
      <SkeletonText width="w-5/6" />
    </div>
  ),
};

export const CircleSkeleton: Story = {
  render: () => <SkeletonCircle width="w-16" height="h-16" />,
};

export const CardSkeleton: Story = {
  render: () => <SkeletonCard width="w-80" height="h-64" />,
};

export const AvatarSkeleton: Story = {
  render: () => <SkeletonAvatar />,
};

// Real-world Examples
export const UserProfileCard: Story = {
  render: () => (
    <div className="border border-mo-gray-border rounded-lg p-4 w-80">
      <div className="flex items-center gap-3 mb-4">
        <SkeletonCircle width="w-12" height="h-12" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="w-32" height="h-4" />
          <Skeleton variant="text" width="w-24" height="h-3" />
        </div>
      </div>
      <Skeleton variant="text" width="w-full" count={3} gap="gap-2" />
    </div>
  ),
};

export const BlogPostCard: Story = {
  render: () => (
    <div className="border border-mo-gray-border rounded-lg overflow-hidden w-80">
      <Skeleton variant="rectangle" width="w-full" height="h-48" />
      <div className="p-4 space-y-3">
        <Skeleton variant="text" width="w-full" height="h-6" />
        <Skeleton variant="text" width="w-full" count={2} gap="gap-2" />
        <div className="flex items-center gap-2 mt-4">
          <SkeletonCircle width="w-6" height="h-6" />
          <Skeleton variant="text" width="w-24" height="h-3" />
        </div>
      </div>
    </div>
  ),
};

export const StockListItem: Story = {
  render: () => (
    <div className="border border-mo-gray-border rounded-lg p-3 w-96">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <SkeletonCircle width="w-10" height="h-10" />
          <div className="space-y-2">
            <Skeleton variant="text" width="w-32" height="h-4" />
            <Skeleton variant="text" width="w-24" height="h-3" />
          </div>
        </div>
        <div className="text-right space-y-2">
          <Skeleton variant="text" width="w-20" height="h-4" />
          <Skeleton variant="text" width="w-16" height="h-3" />
        </div>
      </div>
    </div>
  ),
};

export const DataTable: Story = {
  render: () => (
    <div className="border border-mo-gray-border rounded-lg overflow-hidden w-full">
      {/* Header */}
      <div className="bg-mo-bg-light p-4 flex gap-4">
        <Skeleton variant="text" width="w-32" height="h-4" />
        <Skeleton variant="text" width="w-24" height="h-4" />
        <Skeleton variant="text" width="w-32" height="h-4" />
        <Skeleton variant="text" width="w-20" height="h-4" />
      </div>
      {/* Rows */}
      <div className="divide-y divide-mo-gray-border">
        {[1, 2, 3, 4, 5].map((row) => (
          <div key={row} className="p-4 flex gap-4 items-center">
            <Skeleton variant="text" width="w-32" height="h-4" />
            <Skeleton variant="text" width="w-24" height="h-4" />
            <Skeleton variant="text" width="w-32" height="h-4" />
            <Skeleton variant="text" width="w-20" height="h-4" />
          </div>
        ))}
      </div>
    </div>
  ),
};

export const DashboardCards: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[1, 2, 3].map((card) => (
        <div key={card} className="border border-mo-gray-border rounded-lg p-4">
          <Skeleton variant="text" width="w-24" height="h-4" className="mb-3" />
          <Skeleton variant="text" width="w-32" height="h-8" className="mb-2" />
          <Skeleton variant="text" width="w-20" height="h-3" />
        </div>
      ))}
    </div>
  ),
};

export const CommentList: Story = {
  render: () => (
    <div className="space-y-4 w-full">
      {[1, 2, 3].map((comment) => (
        <div key={comment} className="flex gap-3">
          <SkeletonCircle width="w-10" height="h-10" />
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton variant="text" width="w-24" height="h-4" />
              <Skeleton variant="text" width="w-16" height="h-3" />
            </div>
            <Skeleton variant="text" width="w-full" count={2} gap="gap-2" />
          </div>
        </div>
      ))}
    </div>
  ),
};

// InfoCard Skeleton using generic Skeleton
export const InfoCardExample: Story = {
  render: () => (
    <div className="bg-mo-bg-light rounded-lg p-3 flex items-center justify-between w-96">
      <div className="flex items-center gap-2">
        <SkeletonCircle width="w-10" height="h-10" />
        <div className="space-y-2">
          <Skeleton variant="text" width="w-32" height="h-[18px]" />
          <Skeleton variant="text" width="w-24" height="h-[18px]" />
        </div>
      </div>
      <Skeleton variant="text" width="w-16" height="h-[18px]" />
    </div>
  ),
};

// Custom Sizing
export const CustomSizing: Story = {
  render: () => (
    <div className="space-y-4">
      <Skeleton width="200px" height="50px" />
      <Skeleton width="w-64" height="h-20" />
      <Skeleton width="75%" height="40px" />
    </div>
  ),
};
