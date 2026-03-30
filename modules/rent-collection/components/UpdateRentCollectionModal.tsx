import React, { useState, useEffect } from "react";
import type { RentCollectionRecord } from "../services/rentCollectionApi";
import type { UserRecord } from "../services/userApi";
import type { RoomDetail } from "../../booking/services/roomDetailApi";

interface UpdateRentCollectionModalProps {
  record: RentCollectionRecord;
  users: UserRecord[];
  rooms: RoomDetail[];
  onClose: () => void;
  onSave: (
    id: number,
    data: {
      student_id?: number;
      room_id?: number;
      total_rent?: number;
      paid_rent?: number;
      status?: string;
    }
  ) => Promise<void>;
}

function computeStatus(totalRent: number, paidRent: number): string {
  if (totalRent <= 0) return "unpaid";
  if (paidRent >= totalRent) return "paid";
  if (paidRent > 0) return "partial";
  return "unpaid";
}

const UpdateRentCollectionModal: React.FC<UpdateRentCollectionModalProps> = ({
  record,
  users,
  rooms,
  onClose,
  onSave,
}) => {
  const [studentId, setStudentId] = useState<number>(record.student_id);
  const [roomId, setRoomId] = useState<number>(record.room_id);
  const [totalRent, setTotalRent] = useState<number>(record.total_rent);
  const [paidRent, setPaidRent] = useState<number>(record.paid_rent);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const status = computeStatus(totalRent, paidRent);

  useEffect(() => {
    setStudentId(record.student_id);
    setRoomId(record.room_id);
    setTotalRent(record.total_rent);
    setPaidRent(record.paid_rent);
    setError("");
  }, [record]);

  const handleSave = async () => {
    setError("");

    if (totalRent <= 0) {
      setError("Total rent must be greater than 0.");
      return;
    }
    if (paidRent < 0) {
      setError("Paid rent must be 0 or greater.");
      return;
    }
    if (paidRent > totalRent) {
      setError("Paid rent cannot exceed total rent.");
      return;
    }

    setLoading(true);
    try {
      await onSave(record.id, {
        student_id: studentId,
        room_id: roomId,
        total_rent: totalRent,
        paid_rent: paidRent,
        status: status,
      });
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update record.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: 32,
          minWidth: 450,
          maxWidth: 520,
          boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <h3 style={{ fontWeight: 600, fontSize: 18, margin: 0 }}>
            Update Rent Record
          </h3>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: 22,
              cursor: "pointer",
              color: "#6B7280",
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Student Name Dropdown */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: "#374151" }}>
              Student Name
            </label>
            <select
              value={studentId}
              onChange={(e) => setStudentId(Number(e.target.value))}
              style={{
                padding: "8px 12px",
                borderRadius: 6,
                border: "1px solid #D1D5DB",
                fontSize: 14,
                outline: "none",
                background: "#fff",
              }}
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          {/* Room Number Dropdown */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: "#374151" }}>
              Room No
            </label>
            <select
              value={roomId}
              onChange={(e) => setRoomId(Number(e.target.value))}
              style={{
                padding: "8px 12px",
                borderRadius: 6,
                border: "1px solid #D1D5DB",
                fontSize: 14,
                outline: "none",
                background: "#fff",
              }}
            >
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.room_no}
                </option>
              ))}
            </select>
          </div>

          {/* Total Rent */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: "#374151" }}>
              Total Rent
            </label>
            <input
              type="number"
              value={totalRent}
              onChange={(e) => setTotalRent(Number(e.target.value))}
              min={0}
              step="0.01"
              style={{
                padding: "8px 12px",
                borderRadius: 6,
                border: "1px solid #D1D5DB",
                fontSize: 14,
                outline: "none",
              }}
            />
          </div>

          {/* Paid Rent */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: "#374151" }}>
              Paid Rent
            </label>
            <input
              type="number"
              value={paidRent}
              onChange={(e) => setPaidRent(Number(e.target.value))}
              min={0}
              step="0.01"
              style={{
                padding: "8px 12px",
                borderRadius: 6,
                border: "1px solid #D1D5DB",
                fontSize: 14,
                outline: "none",
              }}
            />
          </div>

          {/* Status (auto-calculated, read-only) */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: "#374151" }}>
              Status
            </label>
            <input
              type="text"
              value={status.charAt(0).toUpperCase() + status.slice(1)}
              readOnly
              style={{
                padding: "8px 12px",
                borderRadius: 6,
                border: "1px solid #D1D5DB",
                fontSize: 14,
                outline: "none",
                background: "#F3F4F6",
                color:
                  status === "paid"
                    ? "#16A34A"
                    : status === "partial"
                    ? "#EA580C"
                    : "#EF4444",
                fontWeight: 600,
              }}
            />
          </div>
        </div>

        {error && (
          <p style={{ color: "#EF4444", marginTop: 12, fontSize: 13 }}>
            {error}
          </p>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 12,
            marginTop: 24,
          }}
        >
          <button
            onClick={onClose}
            style={{
              background: "#F3F4F6",
              color: "#374151",
              borderRadius: 6,
              padding: "8px 20px",
              border: "none",
              fontWeight: 500,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            style={{
              background: loading ? "#93C5FD" : "#2563EB",
              color: "#fff",
              borderRadius: 6,
              padding: "8px 20px",
              border: "none",
              fontWeight: 600,
              fontSize: 14,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateRentCollectionModal;
