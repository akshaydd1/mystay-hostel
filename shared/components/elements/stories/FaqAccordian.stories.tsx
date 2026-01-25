import type { Meta, StoryObj } from '@storybook/react';
import FaqAccordian from '../FaqAccordian';

/**
 * FaqAccordian - Alternative FAQ accordion component
 * 
 * Another variant of the FAQ accordion component with similar functionality.
 * Features smooth animations, icon transitions, and support for both string and React node content.
 * 
 * **Note:** This component appears to be identical to the Faqs component. Consider consolidating.
 * 
 * **When to use:**
 * - Displaying frequently asked questions
 * - Organizing collapsible content sections
 * - Showing expandable information panels
 * 
 * **When not to use:**
 * - For simple static content (use regular text instead)
 * - For navigation (use TabNavigation instead)
 * - For form fields (use appropriate input components)
 */
const meta: Meta<typeof FaqAccordian> = {
  title: 'Elements/FaqAccordian',
  component: FaqAccordian,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'An interactive FAQ accordion component with smooth expand/collapse animations and customizable content.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Heading text above the FAQ list',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'FAQs' },
      },
    },
    faqs: {
      control: 'object',
      description: 'Array of FAQ items with question and answer',
      table: {
        type: { summary: 'FaqItem[]' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FaqAccordian>;

const sampleFaqs = [
  {
    question: 'What is IPO?',
    answer: 'IPO stands for Initial Public Offering. It is the process by which a private company goes public by selling its shares to the general public for the first time.',
  },
  {
    question: 'How do I apply for an IPO?',
    answer: 'You can apply for an IPO through your demat account. Log in to your trading account, navigate to the IPO section, and follow the application process.',
  },
  {
    question: 'What is the minimum investment required?',
    answer: 'The minimum investment varies by IPO. It depends on the lot size and the price band set by the company. Typically, retail investors need to invest in multiples of one lot.',
  },
];

/**
 * Default FAQ accordion
 */
export const Default: Story = {
  args: {
    title: 'FAQs',
    faqs: sampleFaqs,
  },
};

/**
 * With custom title
 */
export const CustomTitle: Story = {
  args: {
    title: 'Frequently Asked Questions',
    faqs: sampleFaqs,
  },
};

/**
 * With rich content (React nodes)
 */
export const RichContent: Story = {
  args: {
    title: 'Requirements',
    faqs: [
      {
        question: 'What documents do I need?',
        answer: (
          <div className="space-y-2">
            <p>Required documents:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>PAN Card</li>
              <li>Aadhaar Card</li>
              <li>Bank Proof</li>
            </ul>
          </div>
        ),
      },
    ],
  },
};
