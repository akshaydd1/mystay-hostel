import React from 'react';
import DataTable from '../../../shared/components/elements/DataTable';
import { StatusTag } from '../../booking/components/StatusTag';
import type { ColumnDef } from '@tanstack/react-table';
import type { RentCollectionRecord } from '../services/rentCollectionApi';
import type { UserRecord } from '../services/userApi';
import type { RoomDetail } from '../../booking/services/roomDetailApi';

export type RentCollectionRow = {
  id: number;
  avatar: string;
  studentName: string;
  roomNo: string;
  totalRent: number;
  paidAmount: number;
  status: string;
  balance: number;
  raw: RentCollectionRecord;
};

interface RentCollectionTableProps {
  records: RentCollectionRecord[];
  users: UserRecord[];
  rooms: RoomDetail[];
  loading: boolean;
  onUpdateClick: (record: RentCollectionRecord) => void;
  onDeleteClick: (record: RentCollectionRecord) => void;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function mapStatus(status: string): string {
  const s = status.toLowerCase();
  if (s === 'paid') return 'paid';
  if (s === 'partial') return 'partial';
  if (s === 'pending' || s === 'unpaid') return 'unpaid';
  return s;
}

const RentCollectionTable: React.FC<RentCollectionTableProps> = ({
  records,
  users,
  rooms,
  loading,
  onUpdateClick,
  onDeleteClick,
}) => {
  const userMap = new Map(users.map((u) => [u.id, u]));
  const roomMap = new Map(rooms.map((r) => [r.id, r]));

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
      cell: ({ getValue }) => <span className="font-medium">₹{Number(getValue()).toFixed(2)}</span>,
    },
    {
      header: 'PAID AMOUNT',
      accessorKey: 'paidAmount',
      cell: ({ getValue }) => <span className="font-medium text-green-600">₹{Number(getValue()).toFixed(2)}</span>,
    },
    {
      header: 'STATUS',
      accessorKey: 'status',
      cell: ({ getValue }) => {
        const s = mapStatus(getValue());
        return <StatusTag status={s as any}>{s.charAt(0).toUpperCase() + s.slice(1)}</StatusTag>;
      },
    },
    {
      header: 'BALANCE',
      accessorKey: 'balance',
      cell: ({ getValue }) => {
        const value = Number(getValue());
        return (
          <span className={value === 0 ? 'text-gray-500' : 'text-red-600 font-semibold'}>
            ₹{value.toFixed(2)}
          </span>
        );
      },
    },
    {
      header: 'ACTION',
      id: 'action',
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <button
            onClick={() => onUpdateClick(row.original.raw)}
            className="text-blue-600 font-medium hover:underline cursor-pointer"
          >
            Update
          </button>
          <button
            onClick={() => onDeleteClick(row.original.raw)}
            className="text-red-600 font-medium hover:underline cursor-pointer"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const data: RentCollectionRow[] = records.map((rec) => {
    const user = userMap.get(rec.student_id);
    const room = roomMap.get(rec.room_id);
    const studentName = user?.name ?? `Student #${rec.student_id}`;
    return {
      id: rec.id,
      avatar: user ? getInitials(user.name) : '??',
      studentName,
      roomNo: room?.room_no ?? `Room #${rec.room_id}`,
      totalRent: rec.total_rent,
      paidAmount: rec.paid_rent,
      status: rec.status,
      balance: rec.balance_rent,
      raw: rec,
    };
  });

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mt-6 p-8 text-center text-gray-500">
        Loading rent collection data...
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mt-6 p-8 text-center text-gray-500">
        No rent collection records found. Click &quot;+ Add Record&quot; to create one.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 mt-6">
      <DataTable columns={columns} data={data} pageSize={5} className="min-w-full" />
      <div className="px-6 py-2 text-xs text-gray-500">
        Showing {Math.min(data.length, 5)} of {data.length} records
      </div>
    </div>
  );
};

export default RentCollectionTable;
