"use client";
import { useState, useEffect, useCallback } from "react";
import SummaryCard from "./components/SummaryCard";
import RentCollectionTable from "./components/RentCollectionTable";
import AddRentCollectionModal from "./components/AddRentCollectionModal";
import UpdateRentCollectionModal from "./components/UpdateRentCollectionModal";
import { HiOutlineCurrencyDollar, HiOutlineCheckCircle, HiOutlineExclamationCircle } from "react-icons/hi";
import {
  fetchAllRentCollections,
  insertRentCollection,
  updateRentCollection,
  deleteRentCollection,
  type RentCollectionRecord,
} from "./services/rentCollectionApi";
import { fetchAllUsers, type UserRecord } from "./services/userApi";
import { fetchAllRooms, type RoomDetail } from "../booking/services/roomDetailApi";

const RentCollectionMain = () => {
  const [records, setRecords] = useState<RentCollectionRecord[]>([]);
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [rooms, setRooms] = useState<RoomDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [updateRecord, setUpdateRecord] = useState<RentCollectionRecord | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [rentData, userData, roomData] = await Promise.all([
        fetchAllRentCollections(),
        fetchAllUsers(),
        fetchAllRooms(),
      ]);
      setRecords(rentData);
      setUsers(userData);
      setRooms(roomData);
    } catch (err) {
      console.error("Failed to load data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleInsert = async (data: {
    student_id: number;
    room_id: number;
    total_rent: number;
    paid_rent: number;
  }) => {
    await insertRentCollection(data);
    await loadData();
  };

  const handleUpdate = async (
    id: number,
    data: {
      student_id?: number;
      room_id?: number;
      total_rent?: number;
      paid_rent?: number;
      status?: string;
    }
  ) => {
    await updateRentCollection(id, data);
    await loadData();
  };

  const handleDelete = async (record: RentCollectionRecord) => {
    if (!window.confirm("Are you sure you want to delete this rent record?")) return;
    try {
      await deleteRentCollection(record.id);
      await loadData();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete record.");
    }
  };

  // Summary calculations
  const totalExpected = records.reduce((sum, r) => sum + r.total_rent, 0);
  const totalCollected = records.reduce((sum, r) => sum + r.paid_rent, 0);
  const outstandingBalance = records.reduce((sum, r) => sum + r.balance_rent, 0);
  const remainingPercent = totalExpected > 0 ? ((outstandingBalance / totalExpected) * 100).toFixed(0) : "0";

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rent Collection</h1>
          <p className="text-gray-500 text-sm mt-1">Monitor payments, track balances, and manage student dues.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 font-medium text-sm shadow-sm hover:bg-gray-50">
            Export CSV
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold text-sm shadow-sm hover:bg-blue-700"
          >
            + Add Record
          </button>
        </div>
      </div>
      <div className="flex gap-4 mt-6">
        <SummaryCard
          title="Total Expected"
          value={`₹${totalExpected.toFixed(2)}`}
          subtext={`${records.length} records`}
          icon={<HiOutlineCurrencyDollar className="text-blue-500" />}
        />
        <SummaryCard
          title="Total Collected"
          value={`₹${totalCollected.toFixed(2)}`}
          subtext={" "}
          icon={<HiOutlineCheckCircle className="text-green-500" />}
          valueColor="#16A34A"
        />
        <SummaryCard
          title="Outstanding Balance"
          value={`₹${outstandingBalance.toFixed(2)}`}
          subtext={`${remainingPercent}% Remaining`}
          icon={<HiOutlineExclamationCircle className="text-orange-400" />}
          valueColor="#EA580C"
          subtextColor="#EA580C"
        />
      </div>
      {/* Table Section */}
      <div className="mt-8">
        <RentCollectionTable
          records={records}
          users={users}
          rooms={rooms}
          loading={loading}
          onUpdateClick={(record) => setUpdateRecord(record)}
          onDeleteClick={handleDelete}
        />
      </div>

      {/* Add Record Modal */}
      {showAddModal && (
        <AddRentCollectionModal
          users={users}
          rooms={rooms}
          onClose={() => setShowAddModal(false)}
          onSave={handleInsert}
        />
      )}

      {/* Update Record Modal */}
      {updateRecord && (
        <UpdateRentCollectionModal
          record={updateRecord}
          users={users}
          rooms={rooms}
          onClose={() => setUpdateRecord(null)}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
};

export default RentCollectionMain;
