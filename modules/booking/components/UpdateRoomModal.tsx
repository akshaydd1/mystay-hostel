import React, { useState, useEffect } from "react";
import type { RoomDetail } from "../services/roomDetailApi";

interface UpdateRoomModalProps {
  room: RoomDetail;
  onClose: () => void;
  onSave: (id: number, data: { room_no: string; floor_no: number; room_type: string }) => Promise<void>;
}

const roomTypeOptions = ["Single", "Double", "Triple", "Dormitory"];

export const UpdateRoomModal: React.FC<UpdateRoomModalProps> = ({ room, onClose, onSave }) => {
  const [roomNo, setRoomNo] = useState(room.room_no);
  const [floorNo, setFloorNo] = useState(room.floor_no);
  const [roomType, setRoomType] = useState(room.room_type);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setRoomNo(room.room_no);
    setFloorNo(room.floor_no);
    setRoomType(room.room_type);
    setError("");
  }, [room]);

  const handleSave = async () => {
    setError("");
    if (!roomNo.trim()) {
      setError("Room number is required.");
      return;
    }
    setLoading(true);
    try {
      await onSave(room.id, { room_no: roomNo.trim(), floor_no: floorNo, room_type: roomType });
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update room.");
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
          minWidth: 400,
          maxWidth: 480,
          boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ fontWeight: 600, fontSize: 18, margin: 0 }}>Update Room Details</h3>
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
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: "#374151" }}>Room No</label>
            <input
              type="text"
              value={roomNo}
              onChange={(e) => setRoomNo(e.target.value)}
              style={{
                padding: "8px 12px",
                borderRadius: 6,
                border: "1px solid #D1D5DB",
                fontSize: 14,
                outline: "none",
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: "#374151" }}>Floor No</label>
            <input
              type="number"
              value={floorNo}
              onChange={(e) => setFloorNo(Number(e.target.value))}
              min={1}
              style={{
                padding: "8px 12px",
                borderRadius: 6,
                border: "1px solid #D1D5DB",
                fontSize: 14,
                outline: "none",
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: "#374151" }}>Room Type</label>
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              style={{
                padding: "8px 12px",
                borderRadius: 6,
                border: "1px solid #D1D5DB",
                fontSize: 14,
                outline: "none",
                background: "#fff",
              }}
            >
              {roomTypeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && <p style={{ color: "#EF4444", marginTop: 12, fontSize: 13 }}>{error}</p>}

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 24 }}>
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
