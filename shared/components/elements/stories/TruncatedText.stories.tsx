import type { Meta, StoryObj } from '@storybook/react';
import { TruncatedText } from '../TruncatedText';

/**
 * TruncatedText - Text truncation with expand/collapse
 * 
 * Displays text with a "Read more/Read less" toggle functionality.
 * Shows a limited number of characters initially and expands to show more on click.
 * 
 * **When to use:**
 * - Long descriptions or content
 * - Product descriptions
 * - Blog post excerpts
 * - User reviews or comments
 * - Any text that needs progressive disclosure
 * 
 * **When not to use:**
 * - For short text that doesn't need truncation
 * - For critical information that must always be visible
 * - For SEO-critical content (may impact crawling)
 */
const meta: Meta<typeof TruncatedText> = {
  title: 'Elements/TruncatedText',
  component: TruncatedText,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A text component that truncates long content with expand/collapse functionality.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'The text content to display',
      table: {
        type: { summary: 'string' },
      },
    },
    initialLength: {
      control: 'number',
      description: 'Maximum characters to show initially',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '100' },
      },
    },
    expandedLength: {
      control: 'number',
      description: 'Maximum characters to show when expanded',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '250' },
      },
    },
    className: {
      control: 'text',
      description: 'Custom class name for the text container',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'text-mo-text-dark text-sm leading-relaxed' },
      },
    },
    buttonClassName: {
      control: 'text',
      description: 'Custom class name for the read more/less button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'ml-1 text-mo-blue-primary hover:underline font-medium' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TruncatedText>;

const shortText = 'This is a short text that does not need truncation.';

const mediumText = 'Reliance Industries Limited is an Indian multinational conglomerate headquartered in Mumbai. It has diverse businesses including energy, petrochemicals, natural gas, retail, telecommunications, mass media, and textiles.';

const longText = 'Reliance Industries Limited is an Indian multinational conglomerate headquartered in Mumbai. It has diverse businesses including energy, petrochemicals, natural gas, retail, telecommunications, mass media, and textiles. Reliance is one of the most profitable companies in India, the largest publicly traded company in India by market capitalization, and the largest company in India as measured by revenue. It is also the eighth largest employer in India with over 236,000 employees. The company is ranked 155th on the Fortune Global 500 list of the world\'s biggest corporations as of 2023. Reliance continues to be India\'s largest exporter, accounting for 7% of India\'s total merchandise exports, and accesses markets in 108 countries.';

const veryLongText = 'Reliance Industries Limited is an Indian multinational conglomerate headquartered in Mumbai. It has diverse businesses including energy, petrochemicals, natural gas, retail, telecommunications, mass media, and textiles. Reliance is one of the most profitable companies in India, the largest publicly traded company in India by market capitalization, and the largest company in India as measured by revenue. It is also the eighth largest employer in India with over 236,000 employees. The company is ranked 155th on the Fortune Global 500 list of the world\'s biggest corporations as of 2023. Reliance continues to be India\'s largest exporter, accounting for 7% of India\'s total merchandise exports, and accesses markets in 108 countries. The company was founded by Dhirubhai Ambani in 1973 as a small textile manufacturer. His sons Mukesh Ambani and Anil Ambani inherited the business, but later demerged in December 2005 into two independent companies. Mukesh Ambani remained the chairman and largest shareholder of the original Reliance Industries. Under his leadership, Reliance has become a diversified conglomerate with interests ranging from traditional industries to cutting-edge technology ventures.';

/**
 * Default truncated text with medium-length content
 */
export const Default: Story = {
  args: {
    text: mediumText,
    initialLength: 100,
    expandedLength: 250,
  },
};

/**
 * Short text that doesn't need truncation (no "read more" shown)
 */
export const ShortText: Story = {
  args: {
    text: shortText,
    initialLength: 100,
  },
};

/**
 * Long text with standard truncation
 */
export const LongText: Story = {
  args: {
    text: longText,
    initialLength: 100,
    expandedLength: 250,
  },
};

/**
 * Very long text that shows "read less" when expanded
 */
export const VeryLongText: Story = {
  args: {
    text: veryLongText,
    initialLength: 100,
    expandedLength: 250,
  },
};

/**
 * Very short initial length (aggressive truncation)
 */
export const AggressiveTruncation: Story = {
  args: {
    text: mediumText,
    initialLength: 50,
    expandedLength: 150,
  },
};

/**
 * Large initial length (more permissive)
 */
export const PermissiveTruncation: Story = {
  args: {
    text: longText,
    initialLength: 200,
    expandedLength: 400,
  },
};

/**
 * Product description style
 */
export const ProductDescription: Story = {
  args: {
    text: 'The iPhone 15 Pro features a stunning titanium design with a textured matte glass back. It comes with the revolutionary A17 Pro chip that delivers incredible performance. The new Action button replaces the Ring/Silent switch. The advanced camera system includes a 48MP main camera, 12MP ultra-wide, and a 12MP telephoto lens with 3x optical zoom. It supports ProRAW and ProRes video recording.',
    initialLength: 80,
    expandedLength: 200,
  },
};

/**
 * User review/comment style
 */
export const UserReview: Story = {
  args: {
    text: 'I have been using this trading platform for over 6 months now and I must say it\'s one of the best platforms I\'ve used. The interface is clean and intuitive, the execution speed is fast, and the customer support is excellent. They recently added some new features like advanced charting tools and customizable watchlists which make trading even better. Highly recommended for both beginners and experienced traders!',
    initialLength: 100,
    expandedLength: 300,
    className: 'text-mo-text-dark text-sm leading-relaxed bg-mo-bg-light p-4 rounded',
  },
};

/**
 * Blog post excerpt
 */
export const BlogExcerpt: Story = {
  args: {
    text: 'Understanding the stock market can seem daunting for beginners, but with the right approach, it becomes much more manageable. Start by learning the basics: what stocks are, how the market works, and key financial metrics. Then, educate yourself about different investment strategies like value investing, growth investing, and dividend investing. Always remember to diversify your portfolio, never invest more than you can afford to lose, and think long-term rather than trying to time the market.',
    initialLength: 120,
    expandedLength: 250,
    className: 'text-mo-text-muted text-sm italic',
  },
};

/**
 * Custom styling with different button appearance
 */
export const CustomStyling: Story = {
  args: {
    text: longText,
    initialLength: 100,
    expandedLength: 250,
    className: 'text-mo-text-dark text-base leading-7',
    buttonClassName: 'ml-2 text-mo-green-success hover:text-mo-green-primary font-semibold underline',
  },
};

/**
 * In a card layout
 */
export const InCard: Story = {
  args: {
    text: mediumText,
    initialLength: 100,
    expandedLength: 250,
  },
  decorators: [
    (Story) => (
      <div className="max-w-md border border-mo-gray-border rounded-lg p-6 bg-white shadow-sm">
        <h3 className="text-lg font-semibold text-mo-text-dark mb-3">About Reliance Industries</h3>
        <Story />
      </div>
    ),
  ],
};
