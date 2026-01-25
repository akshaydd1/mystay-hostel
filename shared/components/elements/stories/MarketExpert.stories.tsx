import type { Meta, StoryObj } from "@storybook/react";
import { MarketExpert } from "@/shared/components/elements/MarketExpert";

const meta: Meta<typeof MarketExpert> = {
  title: "Shared/Elements/MarketExpert",
  component: MarketExpert,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof MarketExpert>;

export const Default: Story = {
  args: {
    title: "What market experts are saying?",
    description:
      "Hear what leading market experts have to say about current trends and opportunities.",
    experts: [
      {
        name: "Rohit Sharma",
        role: "Chief Market Strategist",
        firm: "Motilal Oswal Financial Services",
        comment:
          "We expect volatility to remain elevated in the near term, but strong domestic flows continue to provide downside support.",
        rating: 4.5,
        sentiment: "positive",
      },
      {
        name: "Ananya Mehta",
        role: "Equity Research Head",
        firm: "MOFSL Research 360",
        comment:
          "Earnings visibility remains robust for quality franchises. Investors should stay focused on fundamentals rather than short-term noise.",
        rating: 4.2,
        sentiment: "neutral",
      },
    ],
  },
};

export const WithMixedSentiments: Story = {
  args: {
    title: "Expert take on the markets",
    experts: [
      {
        name: "Arjun Patel",
        role: "Technical Analyst",
        firm: "Independent",
        comment:
          "Key indices are approaching strong resistance zones. A healthy correction cannot be ruled out if global cues turn adverse.",
        rating: 3.8,
        sentiment: "negative",
      },
      {
        name: "Neha Gupta",
        role: "Fund Manager",
        firm: "MO AMC",
        comment:
          "Systematic investing and staggered entry remain the best approach for long-term wealth creation across market cycles.",
        rating: 4.7,
        sentiment: "positive",
      },
      {
        name: "Vikram Iyer",
        role: "Macro Strategist",
        firm: "MOFSL",
        comment:
          "Macro indicators are stabilising, but we continue to monitor global rate expectations and currency movements closely.",
        sentiment: "neutral",
      },
    ],
  },
};

export const InitiallyExpanded: Story = {
  args: {
    defaultCollapsed: false,
    experts: [
      {
        name: "Market Expert",
        comment:
          "This view starts expanded by default, useful when the section is a primary focus on the page.",
        sentiment: "neutral",
      },
    ],
  },
};
