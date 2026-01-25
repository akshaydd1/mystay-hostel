import type { Meta, StoryObj } from "@storybook/react";
import { ProgressBar } from "./ProgressBar";

const meta: Meta<typeof ProgressBar> = {
  title: "Components/Elements/ProgressBar",
  component: ProgressBar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A flexible progress bar component that supports different sizes, colors, and percentage values. Used for displaying trend indicators, loading states, and completion percentages.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Progress value (0-100)",
    },
    max: {
      control: "number",
      description: "Maximum value (default: 100)",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size variant",
    },
    variant: {
      control: "select",
      options: ["default", "primary", "success", "error", "warning", "cyan"],
      description: "Color variant",
    },
    showLabel: {
      control: "boolean",
      description: "Whether to show percentage label",
    },
    backgroundColor: {
      control: "color",
      description: "Custom background color",
    },
    progressColor: {
      control: "color",
      description: "Custom progress color",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

// Default
export const Default: Story = {
  args: {
    value: 60,
    size: "md",
    variant: "default",
  },
};

// With Label
export const WithLabel: Story = {
  args: {
    value: 75,
    size: "md",
    variant: "success",
    showLabel: true,
  },
};

// Sizes
export const Small: Story = {
  args: {
    value: 45,
    size: "sm",
    variant: "primary",
  },
};

export const Medium: Story = {
  args: {
    value: 60,
    size: "md",
    variant: "primary",
  },
};

export const Large: Story = {
  args: {
    value: 80,
    size: "lg",
    variant: "primary",
  },
};

// Variants
export const Primary: Story = {
  args: {
    value: 60,
    variant: "primary",
  },
};

export const Success: Story = {
  args: {
    value: 75,
    variant: "success",
  },
};

export const Error: Story = {
  args: {
    value: 25,
    variant: "error",
  },
};

export const Warning: Story = {
  args: {
    value: 50,
    variant: "warning",
  },
};

export const Cyan: Story = {
  args: {
    value: 65,
    variant: "cyan",
  },
};

// Custom Colors
export const CustomColors: Story = {
  args: {
    value: 70,
    backgroundColor: "#f2f4f7",
    progressColor: "#1da597",
  },
};

// Different Percentages
export const LowProgress: Story = {
  args: {
    value: 10,
    variant: "error",
    showLabel: true,
  },
};

export const MediumProgress: Story = {
  args: {
    value: 50,
    variant: "warning",
    showLabel: true,
  },
};

export const HighProgress: Story = {
  args: {
    value: 90,
    variant: "success",
    showLabel: true,
  },
};

export const Complete: Story = {
  args: {
    value: 100,
    variant: "success",
    showLabel: true,
  },
};

// Multiple Progress Bars (for trend indicators)
export const TrendIndicators: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full">
      <ProgressBar value={60} variant="cyan" />
      <ProgressBar value={70} variant="cyan" />
      <ProgressBar value={80} variant="cyan" />
      <ProgressBar value={2} variant="error" />
      <ProgressBar value={80} variant="cyan" />
    </div>
  ),
};
