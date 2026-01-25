import type { Meta, StoryObj } from '@storybook/react';
import { StockPriceChart } from '../CustomCharts/StockPriceChart';

/**
 * StockPriceChart - Line chart for stock price visualization
 * 
 * A line chart component for visualizing stock price trends.
 * Features smooth curves, gradient fills, and interactive tooltips.
 * 
 * **Features:**
 * - Smooth line with tension
 * - Gradient area fill
 * - Interactive tooltips
 * - Customizable colors
 * - Empty state handling
 * 
 * **When to use:**
 * - Stock price trends
 * - Price history visualization
 * - Simple price movements
 * - Performance charts
 * 
 * **When not to use:**
 * - Detailed OHLC analysis (use StockCandlestickChart)
 * - When candlestick patterns are needed
 * - When precise open/close data is required
 */
const meta: Meta<typeof StockPriceChart> = {
  title: 'Elements/CustomCharts/StockPriceChart',
  component: StockPriceChart,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A line chart component for stock price trend visualization with gradient fill.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: 'Array of price data points',
      table: {
        type: { summary: 'number[]' },
      },
    },
    labels: {
      control: 'object',
      description: 'Array of x-axis labels (timestamps/dates)',
      table: {
        type: { summary: 'string[]' },
      },
    },
    chartType: {
      control: 'radio',
      options: ['line', 'candle'],
      description: 'Chart type (currently only line is implemented)',
      table: {
        type: { summary: "'line' | 'candle'" },
        defaultValue: { summary: 'line' },
      },
    },
    height: {
      control: 'number',
      description: 'Chart height in pixels',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '300' },
      },
    },
    lineColor: {
      control: 'color',
      description: 'Primary color for the line',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '#4b87fb' },
      },
    },
    fillColor: {
      control: 'color',
      description: 'Background gradient color (with opacity)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'rgba(75, 135, 251, 0.15)' },
      },
    },
    showGrid: {
      control: 'boolean',
      description: 'Show grid lines',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
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
type Story = StoryObj<typeof StockPriceChart>;

// Sample data - upward trend
const upwardTrendData = [2400, 2420, 2435, 2455, 2470, 2485, 2495, 2510, 2525, 2540];
const upwardTrendLabels = ['9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00'];

// Sample data - downward trend
const downwardTrendData = [2500, 2485, 2465, 2445, 2425, 2410, 2395, 2380, 2365, 2350];
const downwardTrendLabels = ['9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00'];

// Sample data - volatile
const volatileData = [1650, 1645, 1660, 1655, 1668, 1662, 1670, 1665, 1675, 1670, 1680, 1675, 1685];
const volatileLabels = ['9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30'];

// Sample data - daily (longer period)
const dailyData = [100, 102, 98, 105, 103, 110, 108, 112, 115, 113, 118, 120, 117, 122, 125];
const dailyLabels = ['Jan 1', 'Jan 2', 'Jan 3', 'Jan 4', 'Jan 5', 'Jan 8', 'Jan 9', 'Jan 10', 'Jan 11', 'Jan 12', 'Jan 15', 'Jan 16', 'Jan 17', 'Jan 18', 'Jan 19'];

/**
 * Default upward trending chart
 */
export const Default: Story = {
  args: {
    data: upwardTrendData,
    labels: upwardTrendLabels,
    height: 300,
    showGrid: true,
  },
};

/**
 * Downward trend (bearish)
 */
export const DownwardTrend: Story = {
  args: {
    data: downwardTrendData,
    labels: downwardTrendLabels,
    height: 300,
    showGrid: true,
    lineColor: '#ee212e',
    fillColor: 'rgba(238, 33, 46, 0.15)',
  },
};

/**
 * Volatile market movement
 */
export const VolatileMarket: Story = {
  args: {
    data: volatileData,
    labels: volatileLabels,
    height: 300,
    showGrid: true,
  },
};

/**
 * Daily prices (longer period)
 */
export const DailyPrices: Story = {
  args: {
    data: dailyData,
    labels: dailyLabels,
    height: 300,
    showGrid: true,
  },
};

/**
 * Green color theme (profit/gain)
 */
export const GreenTheme: Story = {
  args: {
    data: upwardTrendData,
    labels: upwardTrendLabels,
    height: 300,
    showGrid: true,
    lineColor: '#00a850',
    fillColor: 'rgba(0, 168, 80, 0.15)',
  },
};

/**
 * Purple color theme
 */
export const PurpleTheme: Story = {
  args: {
    data: volatileData,
    labels: volatileLabels,
    height: 300,
    showGrid: true,
    lineColor: '#9a9cea',
    fillColor: 'rgba(154, 156, 234, 0.15)',
  },
};

/**
 * Without grid lines
 */
export const NoGrid: Story = {
  args: {
    data: upwardTrendData,
    labels: upwardTrendLabels,
    height: 300,
    showGrid: false,
  },
};

/**
 * Tall chart (400px)
 */
export const TallChart: Story = {
  args: {
    data: dailyData,
    labels: dailyLabels,
    height: 400,
    showGrid: true,
  },
};

/**
 * Compact height (200px)
 */
export const CompactHeight: Story = {
  args: {
    data: upwardTrendData,
    labels: upwardTrendLabels,
    height: 200,
    showGrid: true,
  },
};

/**
 * Empty state (no data)
 */
export const EmptyState: Story = {
  args: {
    data: [],
    labels: [],
    height: 300,
    showGrid: true,
  },
};

/**
 * In a card layout
 */
export const InCard: Story = {
  args: {
    data: dailyData,
    labels: dailyLabels,
    height: 300,
    showGrid: true,
  },
  decorators: [
    (Story) => (
      <div className="max-w-4xl border border-mo-gray-border rounded-lg p-6 bg-white shadow-sm">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold text-mo-text-dark">TCS</h3>
              <p className="text-sm text-mo-text-muted">Tata Consultancy Services</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-mo-text-dark">₹125.00</div>
              <div className="text-sm text-mo-green-success">+25.00 (+25.00%)</div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 mb-4">
          <button className="px-3 py-1 text-xs font-medium bg-mo-primary text-white rounded">1D</button>
          <button className="px-3 py-1 text-xs font-medium text-mo-text-muted hover:bg-mo-bg-light rounded">1W</button>
          <button className="px-3 py-1 text-xs font-medium text-mo-text-muted hover:bg-mo-bg-light rounded">1M</button>
          <button className="px-3 py-1 text-xs font-medium text-mo-text-muted hover:bg-mo-bg-light rounded">1Y</button>
        </div>
        <Story />
      </div>
    ),
  ],
};

/**
 * Multiple charts comparison
 */
export const MultipleCharts: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl">
      <div className="border border-mo-gray-border rounded-lg p-4">
        <h4 className="text-sm font-semibold text-mo-text-dark mb-2">Reliance</h4>
        <p className="text-xs text-mo-green-success mb-3">+4.50%</p>
        <StockPriceChart
          data={upwardTrendData}
          labels={upwardTrendLabels}
          height={200}
          showGrid={false}
          lineColor="#00a850"
          fillColor="rgba(0, 168, 80, 0.15)"
        />
      </div>
      <div className="border border-mo-gray-border rounded-lg p-4">
        <h4 className="text-sm font-semibold text-mo-text-dark mb-2">HDFC Bank</h4>
        <p className="text-xs text-mo-red-error mb-3">-2.80%</p>
        <StockPriceChart
          data={downwardTrendData}
          labels={downwardTrendLabels}
          height={200}
          showGrid={false}
          lineColor="#ee212e"
          fillColor="rgba(238, 33, 46, 0.15)"
        />
      </div>
    </div>
  ),
};
