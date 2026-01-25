import type { Meta, StoryObj } from '@storybook/react';
import { PriceRangeSlider } from '../PriceRangeSlider';

/**
 * PriceRangeSlider - Price range visualization component
 * 
 * Displays a price range with low/high values and a current position indicator.
 * Features a gradient progress bar and circular indicator showing current price position.
 * 
 * **When to use:**
 * - Showing day's high/low price range
 * - 52-week high/low visualization
 * - Any range with current value indicator
 * - Price movement visualization
 * 
 * **When not to use:**
 * - For interactive slider input (use HTML input range)
 * - For non-numeric ranges
 * - When precision is critical (this is visual only)
 */
const meta: Meta<typeof PriceRangeSlider> = {
  title: 'Elements/PriceRangeSlider',
  component: PriceRangeSlider,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A visual price range slider showing low/high values with current position indicator.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    lowLabel: {
      control: 'text',
      description: 'Label for the low value',
      table: {
        type: { summary: 'string' },
      },
    },
    lowValue: {
      control: 'number',
      description: 'Low value of the range',
      table: {
        type: { summary: 'number' },
      },
    },
    highLabel: {
      control: 'text',
      description: 'Label for the high value',
      table: {
        type: { summary: 'string' },
      },
    },
    highValue: {
      control: 'number',
      description: 'High value of the range',
      table: {
        type: { summary: 'number' },
      },
    },
    currentValue: {
      control: 'number',
      description: 'Current value (indicator position)',
      table: {
        type: { summary: 'number' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PriceRangeSlider>;

/**
 * Default day range slider at middle position
 */
export const Default: Story = {
  args: {
    lowLabel: 'Day Low',
    lowValue: 166.03,
    highLabel: 'Day High',
    highValue: 168.74,
    currentValue: 167.5,
  },
};

/**
 * Current price at low end
 */
export const AtLowEnd: Story = {
  args: {
    lowLabel: 'Day Low',
    lowValue: 2400.00,
    highLabel: 'Day High',
    highValue: 2500.00,
    currentValue: 2410.00,
  },
};

/**
 * Current price at high end
 */
export const AtHighEnd: Story = {
  args: {
    lowLabel: 'Day Low',
    lowValue: 1600.00,
    highLabel: 'Day High',
    highValue: 1700.00,
    currentValue: 1690.00,
  },
};

/**
 * Exact at low value
 */
export const ExactlyLow: Story = {
  args: {
    lowLabel: 'Day Low',
    lowValue: 980.50,
    highLabel: 'Day High',
    highValue: 1020.75,
    currentValue: 980.50,
  },
};

/**
 * Exact at high value
 */
export const ExactlyHigh: Story = {
  args: {
    lowLabel: 'Day Low',
    lowValue: 3600.00,
    highLabel: 'Day High',
    highValue: 3750.00,
    currentValue: 3750.00,
  },
};

/**
 * 52-week range
 */
export const FiftyTwoWeekRange: Story = {
  args: {
    lowLabel: '52W Low',
    lowValue: 1250.30,
    highLabel: '52W High',
    highValue: 2850.90,
    currentValue: 2100.45,
  },
};

/**
 * Narrow range
 */
export const NarrowRange: Story = {
  args: {
    lowLabel: 'Day Low',
    lowValue: 165.50,
    highLabel: 'Day High',
    highValue: 166.20,
    currentValue: 165.85,
  },
};

/**
 * Wide range
 */
export const WideRange: Story = {
  args: {
    lowLabel: 'Day Low',
    lowValue: 1000.00,
    highLabel: 'Day High',
    highValue: 5000.00,
    currentValue: 3200.00,
  },
};

/**
 * Small price stock
 */
export const SmallPrice: Story = {
  args: {
    lowLabel: 'Day Low',
    lowValue: 12.50,
    highLabel: 'Day High',
    highValue: 15.80,
    currentValue: 14.20,
  },
};

/**
 * Large price stock
 */
export const LargePrice: Story = {
  args: {
    lowLabel: 'Day Low',
    lowValue: 12500.00,
    highLabel: 'Day High',
    highValue: 13200.00,
    currentValue: 12850.00,
  },
};

/**
 * In a card layout
 */
export const InCard: Story = {
  args: {
    lowLabel: 'Day Low',
    lowValue: 166.03,
    highLabel: 'Day High',
    highValue: 168.74,
    currentValue: 167.5,
  },
  decorators: [
    (Story) => (
      <div className="max-w-md border border-mo-gray-border rounded-lg p-4 bg-white shadow-sm">
        <div className="mb-3">
          <h3 className="text-base font-semibold text-mo-text-dark">RELIANCE</h3>
          <p className="text-sm text-mo-text-muted">Reliance Industries</p>
        </div>
        <div className="mb-2 text-2xl font-bold text-mo-text-dark">₹167.50</div>
        <div className="mb-4 text-sm text-mo-green-success">+1.47 (+0.88%)</div>
        <Story />
      </div>
    ),
  ],
};

/**
 * Multiple ranges in a grid
 */
export const MultipleRanges: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
      <div className="border border-mo-gray-border rounded-lg p-4">
        <h4 className="text-sm font-semibold text-mo-text-dark mb-3">Reliance</h4>
        <PriceRangeSlider
          lowLabel="Day Low"
          lowValue={2400.00}
          highLabel="Day High"
          highValue={2500.00}
          currentValue={2465.00}
        />
      </div>
      <div className="border border-mo-gray-border rounded-lg p-4">
        <h4 className="text-sm font-semibold text-mo-text-dark mb-3">TCS</h4>
        <PriceRangeSlider
          lowLabel="Day Low"
          lowValue={3600.00}
          highLabel="Day High"
          highValue={3750.00}
          currentValue={3690.00}
        />
      </div>
      <div className="border border-mo-gray-border rounded-lg p-4">
        <h4 className="text-sm font-semibold text-mo-text-dark mb-3">HDFC Bank</h4>
        <PriceRangeSlider
          lowLabel="Day Low"
          lowValue={1640.00}
          highLabel="Day High"
          highValue={1680.00}
          currentValue={1658.50}
        />
      </div>
      <div className="border border-mo-gray-border rounded-lg p-4">
        <h4 className="text-sm font-semibold text-mo-text-dark mb-3">Infosys</h4>
        <PriceRangeSlider
          lowLabel="Day Low"
          lowValue={1500.00}
          highLabel="Day High"
          highValue={1540.00}
          currentValue={1525.00}
        />
      </div>
    </div>
  ),
};
