import type { Meta, StoryObj } from '@storybook/react';
import BlogCard from '../BlogCard';

const meta: Meta<typeof BlogCard> = {
  title: 'Components/Elements/BlogCard',
  component: BlogCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A blog card component that displays blog post information including image, title, category, date, and social sharing options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'text',
      description: 'Unique blog post ID',
    },
    title: {
      control: 'text',
      description: 'Blog post title',
    },
    summary_image_url: {
      control: 'text',
      description: 'URL for the blog post image',
    },
    category: {
      control: 'text',
      description: 'Blog post category',
    },
    date: {
      control: 'text',
      description: 'Publication date',
    },
    title_filter: {
      control: 'text',
      description: 'URL-friendly title filter for routing',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BlogCard>;

// Default blog card
export const Default: Story = {
  args: {
    id: '1',
    title: 'Understanding the Stock Market: A Beginner\'s Guide',
    summary_image_url: 'https://via.placeholder.com/400x230',
    category: 'Finance',
    date: '2024-01-15',
    title_filter: 'understanding-stock-market-beginners-guide',
  },
};

// Long title
export const LongTitle: Story = {
  args: {
    id: '2',
    title: 'The Complete Guide to Investment Strategies: How to Build Wealth Through Smart Financial Planning and Long-Term Investment Approaches',
    summary_image_url: 'https://via.placeholder.com/400x230',
    category: 'Investment',
    date: '2024-01-20',
    title_filter: 'complete-guide-investment-strategies',
  },
};

// Without image
export const NoImage: Story = {
  args: {
    id: '3',
    title: 'Market Analysis: Q1 2024 Trends',
    summary_image_url: '',
    category: 'Analysis',
    date: '2024-01-25',
    title_filter: 'market-analysis-q1-2024',
  },
};

// Different category
export const DifferentCategory: Story = {
  args: {
    id: '4',
    title: 'Tech Stocks: What to Watch in 2024',
    summary_image_url: 'https://via.placeholder.com/400x230',
    category: 'Technology',
    date: '2024-02-01',
    title_filter: 'tech-stocks-watch-2024',
  },
};

// Recent date
export const RecentDate: Story = {
  args: {
    id: '5',
    title: 'Latest Market Updates',
    summary_image_url: 'https://via.placeholder.com/400x230',
    category: 'News',
    date: new Date().toISOString(),
    title_filter: 'latest-market-updates',
  },
};

// Multiple cards (for layout testing)
export const MultipleCards: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl">
      <BlogCard
        id="1"
        title="First Blog Post"
        summary_image_url="https://via.placeholder.com/400x230"
        category="Finance"
        date="2024-01-15"
        title_filter="first-blog-post"
      />
      <BlogCard
        id="2"
        title="Second Blog Post"
        summary_image_url="https://via.placeholder.com/400x230"
        category="Technology"
        date="2024-01-20"
        title_filter="second-blog-post"
      />
      <BlogCard
        id="3"
        title="Third Blog Post"
        summary_image_url="https://via.placeholder.com/400x230"
        category="Analysis"
        date="2024-01-25"
        title_filter="third-blog-post"
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

