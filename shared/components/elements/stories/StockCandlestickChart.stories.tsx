import type { Meta, StoryObj } from '@storybook/react';
import { StockCandlestickChart, CandlestickDataPoint } from '../CustomCharts/StockCandlestickChart';

/**
 * StockCandlestickChart - Candlestick chart for stock visualization
 * 
 * A candlestick chart component for visualizing stock price movements.
 * Shows open, high, low, and close prices with color-coded candles.
 * 
 * **Features:**
 * - Traditional candlestick visualization
 * - Green for bullish, red for bearish
 * - Interactive tooltips
 * - Customizable height and grid
 * - Empty state handling
 * 
 * **When to use:**
 * - Stock price analysis
 * - Intraday trading charts
 * - Technical analysis
 * - Price movement visualization
 * 
 * **When not to use:**
 * - Simple line charts (use StockPriceChart)
 * - Non-financial data
 * - When OHLC data is not available
 */
const meta: Meta<typeof StockCandlestickChart> = {
  title: 'Elements/CustomCharts/StockCandlestickChart',
  component: StockCandlestickChart,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A candlestick chart component for stock price visualization with OHLC data.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: 'Array of candlestick data points (OHLCV)',
      table: {
        type: { summary: 'CandlestickDataPoint[]' },
      },
    },
    labels: {
      control: 'object',
      description: 'Array of x-axis labels',
      table: {
        type: { summary: 'string[]' },
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
type Story = StoryObj<typeof StockCandlestickChart>;

// Sample data - bullish trend
const bullishData: CandlestickDataPoint[] = [
  { timestamp: '09:30', open: 2400, high: 2420, low: 2390, close: 2415, volume: 1000000 },
  { timestamp: '10:00', open: 2415, high: 2440, low: 2410, close: 2435, volume: 1200000 },
  { timestamp: '10:30', open: 2435, high: 2460, low: 2430, close: 2455, volume: 1500000 },
  { timestamp: '11:00', open: 2455, high: 2475, low: 2450, close: 2470, volume: 1300000 },
  { timestamp: '11:30', open: 2470, high: 2490, low: 2465, close: 2485, volume: 1400000 },
  { timestamp: '12:00', open: 2485, high: 2500, low: 2480, close: 2495, volume: 1100000 },
];

// Sample data - bearish trend
const bearishData: CandlestickDataPoint[] = [
  { timestamp: '09:30', open: 2500, high: 2510, low: 2480, close: 2485, volume: 1000000 },
  { timestamp: '10:00', open: 2485, high: 2490, low: 2460, close: 2465, volume: 1200000 },
  { timestamp: '10:30', open: 2465, high: 2470, low: 2440, close: 2445, volume: 1500000 },
  { timestamp: '11:00', open: 2445, high: 2455, low: 2420, close: 2425, volume: 1300000 },
  { timestamp: '11:30', open: 2425, high: 2435, low: 2405, close: 2410, volume: 1400000 },
  { timestamp: '12:00', open: 2410, high: 2420, low: 2390, close: 2395, volume: 1100000 },
];

// Sample data - volatile/mixed
const volatileData: CandlestickDataPoint[] = [
  { timestamp: '09:30', open: 1650, high: 1670, low: 1640, close: 1645, volume: 800000 },
  { timestamp: '10:00', open: 1645, high: 1665, low: 1635, close: 1660, volume: 900000 },
  { timestamp: '10:30', open: 1660, high: 1680, low: 1650, close: 1655, volume: 1000000 },
  { timestamp: '11:00', open: 1655, high: 1670, low: 1640, close: 1668, volume: 950000 },
  { timestamp: '11:30', open: 1668, high: 1685, low: 1660, close: 1662, volume: 880000 },
  { timestamp: '12:00', open: 1662, high: 1675, low: 1655, close: 1670, volume: 920000 },
  { timestamp: '12:30', open: 1670, high: 1680, low: 1658, close: 1665, volume: 890000 },
  { timestamp: '13:00', open: 1665, high: 1678, low: 1660, close: 1675, volume: 910000 },
];

const labels = bullishData.map(d => d.timestamp);
const bearishLabels = bearishData.map(d => d.timestamp);
const volatileLabels = volatileData.map(d => d.timestamp);

/**
 * Default candlestick chart with bullish trend
 */
export const Default: Story = {
  args: {
    data: bullishData,
    labels: labels,
    height: 300,
    showGrid: true,
  },
};

/**
 * Bearish trend (downward movement)
 */
export const BearishTrend: Story = {
  args: {
    data: bearishData,
    labels: bearishLabels,
    height: 300,
    showGrid: true,
  },
};

/**
 * Volatile market (mixed movement)
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
 * Taller chart (400px)
 */
export const TallChart: Story = {
  args: {
    data: bullishData,
    labels: labels,
    height: 400,
    showGrid: true,
  },
};

/**
 * Without grid lines
 */
export const NoGrid: Story = {
  args: {
    data: volatileData,
    labels: volatileLabels,
    height: 300,
    showGrid: false,
  },
};

/**
 * Compact height (200px)
 */
export const CompactHeight: Story = {
  args: {
    data: bullishData,
    labels: labels,
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
    data: volatileData,
    labels: volatileLabels,
    height: 300,
    showGrid: true,
  },
  decorators: [
    (Story) => (
      <div className="max-w-4xl border border-mo-gray-border rounded-lg p-6 bg-white shadow-sm">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-mo-text-dark">RELIANCE</h3>
            <span className="text-sm text-mo-green-success">+15.50 (+0.92%)</span>
          </div>
          <div className="text-2xl font-bold text-mo-text-dark">₹1,675.00</div>
        </div>
        <Story />
      </div>
    ),
  ],
};

/**
 * Multiple charts in grid
 */
export const MultipleCharts: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl">
      <div className="border border-mo-gray-border rounded-lg p-4">
        <h4 className="text-sm font-semibold text-mo-text-dark mb-3">Bullish Trend</h4>
        <StockCandlestickChart
          data={bullishData}
          labels={labels}
          height={250}
          showGrid={true}
        />
      </div>
      <div className="border border-mo-gray-border rounded-lg p-4">
        <h4 className="text-sm font-semibold text-mo-text-dark mb-3">Bearish Trend</h4>
        <StockCandlestickChart
          data={bearishData}
          labels={bearishLabels}
          height={250}
          showGrid={true}
        />
      </div>
    </div>
  ),
};
