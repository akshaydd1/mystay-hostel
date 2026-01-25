import type { Meta, StoryObj } from "@storybook/react";
import { Collapsible } from "../Collapsible/Collapsible";
import { LuChartBar, LuTrendingUp } from "react-icons/lu";

/**
 * The Collapsible component provides an expandable/collapsible container for content.
 * It features smooth animations, customizable styling, and full accessibility support.
 *
 * ## Usage
 *
 * Use this component when you need to:
 * - Show/hide content sections to save space
 * - Create card-style collapsible sections
 * - Group related information that doesn't need to be visible all the time
 * - Improve page organization and information hierarchy
 * - Display content with optional icons and custom styling
 *
 * ## Accessibility
 *
 * - Uses semantic button element for toggle
 * - Includes proper ARIA attributes (aria-label, aria-hidden)
 * - Keyboard accessible with focus indicators
 * - Screen reader compatible
 * - Smooth transitions for visual feedback
 */
const meta: Meta<typeof Collapsible> = {
  title: "Components/Elements/Collapsible",
  component: Collapsible,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A flexible collapsible card component with customizable styling and smooth animations. Supports both children and component rendering patterns.",
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: "color-contrast",
            enabled: true,
          },
          {
            id: "button-name",
            enabled: true,
          },
        ],
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "The title/header text displayed in the collapsible",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Card Title" },
      },
    },
    defaultCollapsed: {
      control: "boolean",
      description: "Initial collapsed state",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    collapsible: {
      control: "boolean",
      description: "Whether the component can be collapsed/expanded",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    children: {
      control: "text",
      description: "Content to be displayed when expanded",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    component: {
      control: false,
      description: "Component to be rendered when expanded",
      table: {
        type: { summary: "React.ComponentType<any>" },
      },
    },
    icon: {
      control: false,
      description: "Icon component to display next to title",
      table: {
        type: { summary: "React.ReactElement" },
        defaultValue: { summary: "<LuChartBar />" },
      },
    },
    iconSize: {
      control: "number",
      description: "Icon size in pixels",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "20" },
      },
    },
    iconColor: {
      control: "text",
      description: "Icon color - Tailwind color class",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "text-mo-copyright" },
      },
    },
    backgroundColor: {
      control: "text",
      description: "Background color class",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "bg-blue-100" },
      },
    },
    titleColor: {
      control: "text",
      description: "Title color class",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "text-mo-copyright" },
      },
    },
    chevronColor: {
      control: "text",
      description: "Chevron color - Tailwind color class",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "text-mo-blue-secondary" },
      },
    },
    borderRadius: {
      control: "text",
      description: "Border radius class",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "rounded-2xl" },
      },
    },
    onToggleCollapse: {
      action: "collapsed",
      description: "Callback when collapse state changes",
      table: {
        type: { summary: "(collapsed: boolean) => void" },
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes for the container",
      table: {
        type: { summary: "string" },
      },
    },
    contentClassName: {
      control: "text",
      description: "Additional CSS classes for the content container",
      table: {
        type: { summary: "string" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

/**
 * The default collapsible with blue background and chart bar icon.
 */
export const Default: Story = {
  args: {
    title: "What market experts are saying?",
    backgroundColor: "bg-blue-100",
    icon: <LuChartBar />,
    children: (
      <div className="space-y-4">
        <p className="text-mo-text-dark">
          Based on 32 analysts offering ratings and 12-month price targets.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-mo-text-dark">
              Consensus Verdict
            </h4>
            <p className="text-mo-green-success font-semibold">Strong Buy</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-mo-text-dark">Stock Rating</h4>
            <p className="text-mo-blue-main font-semibold">09/10</p>
          </div>
        </div>
      </div>
    ),
  },
};

/**
 * Collapsible with custom blue background
 */
export const BlueBackground: Story = {
  args: {
    title: "How has the Stock Performed?",
    backgroundColor: "bg-blue-100",
    icon: <LuTrendingUp />,
    iconColor: "text-mo-copyright",
    children: (
      <div className="space-y-4">
        <p className="text-mo-text-dark">
          Stock performance details and analytics will be displayed here.
        </p>
        <div className="h-[200px] bg-mo-bg-light rounded-lg flex items-center justify-center text-mo-text-muted">
          Chart Placeholder
        </div>
      </div>
    ),
  },
};

/**
 * Collapsible with purple background
 */
export const PurpleBackground: Story = {
  args: {
    title: "How is the stock price moving?",
    backgroundColor: "bg-purple-100",
    icon: <LuChartBar />,
    iconColor: "text-purple-600",
    titleColor: "text-purple-900",
    chevronColor: "text-purple-600",
    children: (
      <div className="space-y-4">
        <p className="text-mo-text-dark">
          Real-time stock price movements and trends.
        </p>
        <div className="h-[150px] bg-mo-bg-light rounded-lg flex items-center justify-center text-mo-text-muted">
          Price Movement Chart
        </div>
      </div>
    ),
  },
};

/**
 * Collapsible with green background
 */
export const GreenBackground: Story = {
  args: {
    title: "Stock Scorecard",
    backgroundColor: "bg-green-100",
    icon: <LuChartBar />,
    iconColor: "text-green-600",
    titleColor: "text-green-900",
    chevronColor: "text-green-600",
    children: (
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-mo-text-muted text-sm">Quality</p>
            <p className="text-2xl font-semibold text-mo-blue-main">50/100</p>
          </div>
          <div className="text-center">
            <p className="text-mo-text-muted text-sm">Valuation</p>
            <p className="text-2xl font-semibold text-mo-blue-main">50/100</p>
          </div>
          <div className="text-center">
            <p className="text-mo-text-muted text-sm">Technical</p>
            <p className="text-2xl font-semibold text-mo-blue-main">50/100</p>
          </div>
        </div>
      </div>
    ),
  },
};

/**
 * Initially collapsed collapsible
 */
export const DefaultCollapsed: Story = {
  args: {
    title: "What market experts are saying?",
    backgroundColor: "bg-blue-100",
    defaultCollapsed: true,
    icon: <LuTrendingUp />,
    children: (
      <div className="space-y-4">
        <p className="text-mo-text-dark">
          This collapsible is initially collapsed by default.
        </p>
        <ul className="list-disc list-inside space-y-2 text-mo-text-dark">
          <li>Expert opinion 1</li>
          <li>Expert opinion 2</li>
          <li>Expert opinion 3</li>
        </ul>
      </div>
    ),
  },
};

/**
 * Non-collapsible (always expanded)
 */
export const NonCollapsible: Story = {
  args: {
    title: "Always Visible Content",
    backgroundColor: "bg-blue-100",
    collapsible: false,
    icon: <LuChartBar />,
    children: (
      <div className="space-y-4">
        <p className="text-mo-text-dark">
          This content cannot be collapsed. Notice there's no chevron button.
        </p>
      </div>
    ),
  },
};

/**
 * Collapsible with long content to demonstrate scrolling
 */
export const LongContent: Story = {
  args: {
    title: "Detailed Financial Analysis",
    backgroundColor: "bg-blue-100",
    icon: <LuChartBar />,
    children: (
      <div className="space-y-4">
        <h4 className="font-semibold text-mo-text-dark">Revenue Analysis</h4>
        <p className="text-mo-text-dark">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <h4 className="font-semibold text-mo-text-dark">Profit Margins</h4>
        <p className="text-mo-text-dark">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </p>
        <h4 className="font-semibold text-mo-text-dark">Market Position</h4>
        <p className="text-mo-text-dark">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo.
        </p>
      </div>
    ),
  },
};

/**
 * Collapsible with custom icon size
 */
export const CustomIconSize: Story = {
  args: {
    title: "Large Icon Example",
    backgroundColor: "bg-blue-100",
    icon: <LuChartBar />,
    iconSize: 32,
    iconColor: "text-mo-blue-main",
    children: (
      <div className="space-y-4">
        <p className="text-mo-text-dark">
          This example shows a larger icon (32px instead of the default 20px).
        </p>
      </div>
    ),
  },
};

/**
 * Collapsible with custom border radius
 */
export const CustomBorderRadius: Story = {
  args: {
    title: "Small Border Radius",
    backgroundColor: "bg-blue-100",
    borderRadius: "rounded-lg",
    icon: <LuChartBar />,
    children: (
      <div className="space-y-4">
        <p className="text-mo-text-dark">
          This example uses a smaller border radius (rounded-lg instead of
          rounded-2xl).
        </p>
      </div>
    ),
  },
};

/**
 * Multiple collapsibles in a stack (accordion pattern)
 */
export const MultipleCollapsibles: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Collapsible
        title="What market experts are saying?"
        backgroundColor="bg-blue-100"
        icon={<LuTrendingUp />}
      >
        <p className="text-mo-text-dark">
          Based on 32 analysts offering ratings and 12-month price targets.
        </p>
      </Collapsible>

      <Collapsible
        title="How is the stock price moving?"
        backgroundColor="bg-purple-100"
        icon={<LuChartBar />}
        iconColor="text-purple-600"
        titleColor="text-purple-900"
        chevronColor="text-purple-600"
      >
        <p className="text-mo-text-dark">
          Real-time stock price movements and trends.
        </p>
      </Collapsible>

      <Collapsible
        title="Stock Scorecard"
        backgroundColor="bg-green-100"
        icon={<LuChartBar />}
        iconColor="text-green-600"
        titleColor="text-green-900"
        chevronColor="text-green-600"
      >
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-mo-text-muted text-sm">Quality</p>
            <p className="text-2xl font-semibold text-mo-blue-main">50/100</p>
          </div>
          <div className="text-center">
            <p className="text-mo-text-muted text-sm">Valuation</p>
            <p className="text-2xl font-semibold text-mo-blue-main">50/100</p>
          </div>
          <div className="text-center">
            <p className="text-mo-text-muted text-sm">Technical</p>
            <p className="text-2xl font-semibold text-mo-blue-main">50/100</p>
          </div>
        </div>
      </Collapsible>
    </div>
  ),
};

/**
 * Without icon
 */
export const WithoutIcon: Story = {
  args: {
    title: "Simple Collapsible Without Icon",
    backgroundColor: "bg-blue-100",
    icon: undefined,
    children: (
      <div className="space-y-4">
        <p className="text-mo-text-dark">
          This collapsible doesn't have an icon, showing a cleaner, simpler
          design.
        </p>
      </div>
    ),
  },
};

/**
 * Interactive example demonstrating callback
 */
export const WithCallback: Story = {
  args: {
    title: "Collapsible with Callback",
    backgroundColor: "bg-blue-100",
    icon: <LuTrendingUp />,
    onToggleCollapse: (collapsed) => {
      console.log("Collapsible is now:", collapsed ? "collapsed" : "expanded");
    },
    children: (
      <div className="space-y-4">
        <p className="text-mo-text-dark">
          Check the Actions tab below to see the toggle events being logged.
        </p>
      </div>
    ),
  },
};

/**
 * Using component prop instead of children
 */
const SampleComponent = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="space-y-4">
    <h4 className="font-semibold text-mo-text-dark">{title}</h4>
    <p className="text-mo-text-dark">{description}</p>
  </div>
);

export const WithComponentProp: Story = {
  args: {
    title: "Using Component Prop",
    backgroundColor: "bg-blue-100",
    icon: <LuChartBar />,
    component: <SampleComponent title="Component Rendered Content" description="This content is rendered using the component prop instead of children." />,
    
  },
};
