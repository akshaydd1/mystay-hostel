import type { Meta, StoryObj } from '@storybook/react';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '../DataTable';

/**
 * DataTable - Flexible data table component
 * 
 * A powerful data table component built with TanStack Table (React Table v8).
 * Features sorting, pagination, custom styling, and flexible column configuration.
 * 
 * **Features:**
 * - Sorting (including custom date sorting for DD-MMM-YYYY format)
 * - Pagination with customizable page size
 * - Custom row and cell styling
 * - Responsive design with horizontal scroll
 * - TypeScript support for type-safe columns
 * 
 * **When to use:**
 * - Displaying tabular data with many rows
 * - Lists that need sorting or pagination
 * - Financial data, reports, transaction lists
 * - Any structured data presentation
 * 
 * **When not to use:**
 * - For simple lists (use regular list elements)
 * - For non-tabular data (use cards or grids)
 * - For very large datasets without virtualization
 */
const meta: Meta<typeof DataTable> = {
  title: 'Elements/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A feature-rich data table component with sorting, pagination, and custom styling options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: 'object',
      description: 'Column definitions using TanStack Table format',
      table: {
        type: { summary: 'ColumnDef<TData, TValue>[]' },
      },
    },
    data: {
      control: 'object',
      description: 'Array of data objects to display',
      table: {
        type: { summary: 'TData[]' },
      },
    },
    pageSize: {
      control: 'number',
      description: 'Number of rows per page',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '10' },
      },
    },
    enablePagination: {
      control: 'boolean',
      description: 'Enable/disable pagination',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    enableSorting: {
      control: 'boolean',
      description: 'Enable/disable column sorting',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    maxVisiblePages: {
      control: 'number',
      description: 'Maximum page buttons to show in pagination',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '5' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DataTable>;

// Sample data types
interface Stock {
  symbol: string;
  company: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
}

interface Transaction {
  id: string;
  date: string;
  type: 'Buy' | 'Sell';
  stock: string;
  quantity: number;
  price: number;
  total: number;
}

interface IPO {
  company: string;
  openDate: string;
  closeDate: string;
  issuePrice: string;
  lotSize: number;
  status: 'Open' | 'Closed' | 'Upcoming';
}

// Sample data
const stockData: Stock[] = [
  { symbol: 'RELIANCE', company: 'Reliance Industries', price: 2450.50, change: 25.30, changePercent: 1.04, volume: '12.5M' },
  { symbol: 'TCS', company: 'Tata Consultancy Services', price: 3680.75, change: -15.20, changePercent: -0.41, volume: '8.3M' },
  { symbol: 'HDFCBANK', company: 'HDFC Bank', price: 1650.20, change: 8.50, changePercent: 0.52, volume: '15.7M' },
  { symbol: 'INFY', company: 'Infosys', price: 1520.40, change: 12.80, changePercent: 0.85, volume: '10.2M' },
  { symbol: 'ICICIBANK', company: 'ICICI Bank', price: 980.60, change: -5.30, changePercent: -0.54, volume: '18.9M' },
];

const transactionData: Transaction[] = [
  { id: 'TXN001', date: '15-Jan-2026', type: 'Buy', stock: 'RELIANCE', quantity: 10, price: 2425.20, total: 24252.00 },
  { id: 'TXN002', date: '14-Jan-2026', type: 'Sell', stock: 'TCS', quantity: 5, price: 3695.95, total: 18479.75 },
  { id: 'TXN003', date: '13-Jan-2026', type: 'Buy', stock: 'HDFCBANK', quantity: 20, price: 1641.70, total: 32834.00 },
  { id: 'TXN004', date: '12-Jan-2026', type: 'Buy', stock: 'INFY', quantity: 15, price: 1507.60, total: 22614.00 },
  { id: 'TXN005', date: '11-Jan-2026', type: 'Sell', stock: 'ICICIBANK', quantity: 25, price: 985.90, total: 24647.50 },
];

const ipoData: IPO[] = [
  { company: 'ABC Technologies', openDate: '20-Jan-2026', closeDate: '22-Jan-2026', issuePrice: '₹250-280', lotSize: 50, status: 'Upcoming' },
  { company: 'XYZ Limited', openDate: '10-Jan-2026', closeDate: '12-Jan-2026', issuePrice: '₹180-200', lotSize: 75, status: 'Open' },
  { company: 'PQR Industries', openDate: '05-Jan-2026', closeDate: '07-Jan-2026', issuePrice: '₹120-150', lotSize: 100, status: 'Closed' },
];

// Column definitions
const stockColumns: ColumnDef<Stock>[] = [
  {
    accessorKey: 'symbol',
    header: 'Symbol',
    cell: (info) => <span className="font-semibold text-mo-text-dark">{info.getValue() as string}</span>,
  },
  {
    accessorKey: 'company',
    header: 'Company',
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: (info) => `₹${(info.getValue() as number).toFixed(2)}`,
  },
  {
    accessorKey: 'change',
    header: 'Change',
    cell: (info) => {
      const value = info.getValue() as number;
      return (
        <span className={value >= 0 ? 'text-mo-green-success' : 'text-mo-red-error'}>
          {value >= 0 ? '+' : ''}{value.toFixed(2)}
        </span>
      );
    },
  },
  {
    accessorKey: 'changePercent',
    header: 'Change %',
    cell: (info) => {
      const value = info.getValue() as number;
      return (
        <span className={value >= 0 ? 'text-mo-green-success' : 'text-mo-red-error'}>
          {value >= 0 ? '+' : ''}{value.toFixed(2)}%
        </span>
      );
    },
  },
  {
    accessorKey: 'volume',
    header: 'Volume',
  },
];

const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'id',
    header: 'Transaction ID',
  },
  {
    accessorKey: 'date',
    header: 'Date',
    sortingFn: 'date-dd-mmm-yyyy' as any,
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: (info) => {
      const type = info.getValue() as string;
      return (
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          type === 'Buy' ? 'bg-mo-green-soft text-mo-green-success' : 'bg-mo-red-soft text-mo-red-error'
        }`}>
          {type}
        </span>
      );
    },
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: (info) => `₹${(info.getValue() as number).toFixed(2)}`,
  },
  {
    accessorKey: 'total',
    header: 'Total',
    cell: (info) => <span className="font-semibold">₹{(info.getValue() as number).toFixed(2)}</span>,
  },
];

const ipoColumns: ColumnDef<IPO>[] = [
  {
    accessorKey: 'company',
    header: 'Company',
  },
  {
    accessorKey: 'openDate',
    header: 'Open Date',
    sortingFn: 'date-dd-mmm-yyyy' as any,
  },
  {
    accessorKey: 'closeDate',
    header: 'Close Date',
    sortingFn: 'date-dd-mmm-yyyy' as any,
  },
  {
    accessorKey: 'issuePrice',
    header: 'Issue Price',
  },
  {
    accessorKey: 'lotSize',
    header: 'Lot Size',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (info) => {
      const status = info.getValue() as string;
      const statusClasses = {
        Open: 'bg-mo-green-soft text-mo-green-success',
        Closed: 'bg-mo-gray-light text-mo-gray-text',
        Upcoming: 'bg-mo-blue-light text-mo-blue-primary',
      };
      return (
        <span className={`px-2 py-1 rounded text-xs font-medium ${statusClasses[status as keyof typeof statusClasses]}`}>
          {status}
        </span>
      );
    },
  },
];

/**
 * Default stock data table with sorting and pagination
 */
export const Default: Story = {
  args: {
    columns: stockColumns as ColumnDef<unknown, unknown>[],
    data: stockData,
    pageSize: 10,
    enablePagination: true,
    enableSorting: true,
  },
};

/**
 * Transaction history table with date sorting
 */
export const TransactionHistory: Story = {
  args: {
    columns: transactionColumns as ColumnDef<unknown, unknown>[],
    data: transactionData,
    pageSize: 5,
    enablePagination: true,
    enableSorting: true,
  },
};

/**
 * IPO list table with status badges
 */
export const IPOList: Story = {
  args: {
    columns: ipoColumns as ColumnDef<unknown, unknown>[],
    data: ipoData,
    pageSize: 5,
    enablePagination: false,
    enableSorting: true,
  },
};

/**
 * Table without pagination
 */
export const NoPagination: Story = {
  args: {
    columns: stockColumns as ColumnDef<unknown, unknown>[],
    data: stockData,
    enablePagination: false,
    enableSorting: true,
  },
};

/**
 * Table without sorting
 */
export const NoSorting: Story = {
  args: {
    columns: stockColumns as ColumnDef<unknown, unknown>[],
    data: stockData,
    pageSize: 10,
    enablePagination: true,
    enableSorting: false,
  },
};

/**
 * Table with custom row styling (alternating colors)
 */
export const AlternatingRows: Story = {
  args: {
    columns: stockColumns as ColumnDef<unknown, unknown>[],
    data: stockData,
    pageSize: 10,
    rowClassName: (_row, index) => index % 2 === 0 ? 'bg-mo-bg-light' : 'bg-white',
    enablePagination: true,
    enableSorting: true,
  },
};

/**
 * Table with custom styling classes
 */
export const CustomStyling: Story = {
  args: {
    columns: stockColumns as ColumnDef<unknown, unknown>[],
    data: stockData,
    headerClassName: 'bg-mo-primary text-white font-semibold',
    bodyClassName: 'text-sm',
    cellClassName: 'border-b border-mo-gray-border',
    pageSize: 5,
    enablePagination: true,
    enableSorting: true,
  },
};

/**
 * Minimal table (no features enabled)
 */
export const Minimal: Story = {
  args: {
    columns: stockColumns as ColumnDef<unknown, unknown>[],
    data: stockData.slice(0, 3),
    enablePagination: false,
    enableSorting: false,
  },
};
