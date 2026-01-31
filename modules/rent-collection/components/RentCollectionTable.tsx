import React from 'react';
import DataTable from '../../../shared/components/elements/DataTable';
import { StatusTag } from '../../booking/components/StatusTag';

import type { ColumnDef } from '@tanstack/react-table'; // or the correct import for your DataTable

type RentCollectionRow = {
  avatar: string;
  studentName: string;
  roomNo: string;
  totalRent: string;
  paidAmount: string;
  status: string;
  balance: string;
};

const columns: ColumnDef<RentCollectionRow, any>[] = [
  {
    header: 'STUDENT NAME',
    accessorKey: 'studentName',
    cell: ({ row, getValue }) => (
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 text-xs font-semibold text-gray-700">
          {row.original.avatar}
        </span>
        <span className="font-medium text-gray-900">{getValue()}</span>
      </div>
    ),
  },
  {
    header: 'ROOM NO',
    accessorKey: 'roomNo',
  },
  {
    header: 'TOTAL RENT',
    accessorKey: 'totalRent',
    cell: ({ getValue }) => <span className="font-medium">{getValue()}</span>,
  },
  {
    header: 'PAID AMOUNT',
    accessorKey: 'paidAmount',
    cell: ({ getValue }) => <span className="font-medium text-green-600">{getValue()}</span>,
  },
  {
    header: 'STATUS',
    accessorKey: 'status',
    cell: ({ getValue }) => <StatusTag status={getValue()} />,
  },
  {
    header: 'BALANCE',
    accessorKey: 'balance',
    cell: ({ getValue }) => {
      const value = getValue();
      return <span className={value === '$0.00' ? 'text-gray-500' : 'text-red-600 font-semibold'}>{value}</span>;
    },
  },
  {
    header: 'ACTION',
    id: 'action',
    enableSorting: false,
    cell: ({ row }) => (
      <a href="#" className="text-blue-600 font-medium hover:underline">Update Payment</a>
    ),
  },
];

const data = [
  {
    avatar: 'JS',
    studentName: 'James Smith',
    roomNo: 'Wing A - 102',
    totalRent: '$1,200.00',
    paidAmount: '$1,200.00',
    status: 'Paid',
    balance: '$0.00',
  },
  {
    avatar: 'EL',
    studentName: 'Emily Lawson',
    roomNo: 'Wing B - 205',
    totalRent: '$1,200.00',
    paidAmount: '$800.00',
    status: 'Partial',
    balance: '$400.00',
  },
  {
    avatar: 'MC',
    studentName: 'Marcus Chen',
    roomNo: 'Wing A - 301',
    totalRent: '$1,200.00',
    paidAmount: '$0.00',
    status: 'Unpaid',
    balance: '$1,200.00',
  },
  {
    avatar: 'SW',
    studentName: 'Sarah Williams',
    roomNo: 'Wing C - 205',
    totalRent: '$1,450.00',
    paidAmount: '$1,000.00',
    status: 'Partial',
    balance: '$450.00',
  },
  {
    avatar: 'DA',
    studentName: 'David Adams',
    roomNo: 'Wing B - 112',
    totalRent: '$1,200.00',
    paidAmount: '$1,200.00',
    status: 'Paid',
    balance: '$0.00',
  },
];

const RentCollectionTable: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 mt-6">
      <DataTable
        columns={columns}
        data={data}
        pageSize={5}
        className="min-w-full"
      />
      <div className="px-6 py-2 text-xs text-gray-500">Showing 1 to 5 of 128 students</div>
    </div>
  );
};

export default RentCollectionTable;
