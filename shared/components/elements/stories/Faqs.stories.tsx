import type { Meta, StoryObj } from '@storybook/react';
import Faqs from '../Faqs';

/**
 * Faqs - Accordion-style FAQ component
 * 
 * A collapsible accordion component for displaying frequently asked questions.
 * Features smooth animations, icon transitions, and support for both string and React node content.
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
const meta: Meta<typeof Faqs> = {
  title: 'Elements/Faqs',
  component: Faqs,
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
type Story = StoryObj<typeof Faqs>;

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
  {
    question: 'When will I get the IPO allotment?',
    answer: 'IPO allotment typically happens within 7-10 business days after the IPO closes. You will be notified via email and SMS about your allotment status.',
  },
];

const investmentFaqs = [
  {
    question: 'What is a mutual fund?',
    answer: 'A mutual fund is an investment vehicle that pools money from multiple investors to invest in a diversified portfolio of stocks, bonds, or other securities, managed by professional fund managers.',
  },
  {
    question: 'How are returns calculated?',
    answer: 'Returns are typically calculated using NAV (Net Asset Value) changes over time. The formula is: ((Current NAV - Initial NAV) / Initial NAV) × 100.',
  },
  {
    question: 'What are the risks involved?',
    answer: 'All investments carry some level of risk, including market risk, credit risk, and liquidity risk. The risk level varies based on the type of investment and market conditions.',
  },
];

const richContentFaqs = [
  {
    question: 'What documents are required?',
    answer: (
      <div className="space-y-2">
        <p>You will need the following documents:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>PAN Card</li>
          <li>Aadhaar Card</li>
          <li>Bank Account Proof</li>
          <li>Demat Account Details</li>
        </ul>
      </div>
    ),
  },
  {
    question: 'How long does the process take?',
    answer: (
      <div className="space-y-2">
        <p>The typical timeline is:</p>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Application submission - Instant</li>
          <li>Verification - 1-2 business days</li>
          <li>Account activation - 3-5 business days</li>
        </ol>
        <p className="mt-2 text-mo-blue-primary font-medium">Total: 5-7 business days</p>
      </div>
    ),
  },
];

/**
 * Default FAQ accordion with standard questions and answers
 */
export const Default: Story = {
  args: {
    title: 'FAQs',
    faqs: sampleFaqs,
  },
};

/**
 * FAQ accordion with investment-related questions
 */
export const InvestmentFaqs: Story = {
  args: {
    title: 'Investment FAQs',
    faqs: investmentFaqs,
  },
};

/**
 * FAQ accordion with rich HTML content including lists and formatting
 */
export const RichContent: Story = {
  args: {
    title: 'Documentation Required',
    faqs: richContentFaqs,
  },
};

/**
 * FAQ accordion with custom title
 */
export const CustomTitle: Story = {
  args: {
    title: 'Frequently Asked Questions About Trading',
    faqs: sampleFaqs,
  },
};

/**
 * FAQ accordion with minimal items (2 questions)
 */
export const MinimalItems: Story = {
  args: {
    title: 'Quick FAQs',
    faqs: sampleFaqs.slice(0, 2),
  },
};

/**
 * FAQ accordion with many items (demonstrating scrollable content)
 */
export const ManyItems: Story = {
  args: {
    title: 'Complete FAQ Guide',
    faqs: [
      ...sampleFaqs,
      ...investmentFaqs,
      {
        question: 'Additional question 1?',
        answer: 'This is an additional answer to demonstrate many FAQ items.',
      },
      {
        question: 'Additional question 2?',
        answer: 'This is another additional answer for the FAQ list.',
      },
    ],
  },
};

/**
 * FAQ accordion with long content that exceeds max-height
 */
export const LongContent: Story = {
  args: {
    title: 'Detailed Information',
    faqs: [
      {
        question: 'What is the complete process for opening a trading account?',
        answer: `Opening a trading account is a straightforward process. First, you need to choose a registered broker or financial institution. Next, you'll need to submit your KYC (Know Your Customer) documents including PAN card, Aadhaar card, address proof, and bank account details. The broker will verify your documents within 1-2 business days. Once verified, you'll receive your trading credentials via email. You can then fund your account through net banking or other payment methods. After funding, you're ready to start trading. The entire process typically takes 5-7 business days from start to finish. Make sure to read all terms and conditions carefully before proceeding.`,
      },
    ],
  },
};

/**
 * Single FAQ item for testing individual accordion behavior
 */
export const SingleItem: Story = {
  args: {
    title: 'Single FAQ',
    faqs: [sampleFaqs[0]],
  },
};
