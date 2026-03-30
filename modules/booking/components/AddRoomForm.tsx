import React, { useState } from "react";

interface AddRoomFormProps {
  onRoomAdded: () => void;
  onInsertRoom: (data: { room_no: string; floor_no: number; room_type: string }) => Promise<void>;
}

const roomTypeOptions = ["Single", "Double", "Triple", "Dormitory"];

export const AddRoomForm: React.FC<AddRoomFormProps> = ({ onRoomAdded, onInsertRoom }) => {
  const [roomNo, setRoomNo] = useState("");
  const [floorNo, setFloorNo] = useState<number>(1);
  const [roomType, setRoomType] = useState(roomTypeOptions[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!roomNo.trim()) {
      setError("Room number is required.");
      return;
    }
    setLoading(true);
    try {
      await onInsertRoom({ room_no: roomNo.trim(), floor_no: floorNo, room_type: roomType });
      setRoomNo("");
      setFloorNo(1);
      setRoomType(roomTypeOptions[0]);
      onRoomAdded();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to add room.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        padding: 24,
        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
        marginBottom: 32,
      }}
    >
      <h3 style={{ fontWeight: 600, fontSize: 18, marginBottom: 16 }}>Add New Room</h3>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 16, alignItems: "flex-end", flexWrap: "wrap" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label style={{ fontSize: 13, fontWeight: 500, color: "#374151" }}>Room No</label>
          <input
            type="text"
            value={roomNo}
            onChange={(e) => setRoomNo(e.target.value)}
            placeholder="e.g. 101"
            style={{
              padding: "8px 12px",
              borderRadius: 6,
              border: "1px solid #D1D5DB",
              fontSize: 14,
              width: 140,
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
              width: 100,
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
              width: 160,
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
        <button
          type="submit"
          disabled={loading}
          style={{
            background: loading ? "#93C5FD" : "#2563EB",
            color: "#fff",
            borderRadius: 6,
            padding: "8px 24px",
            border: "none",
            fontWeight: 600,
            fontSize: 14,
            cursor: loading ? "not-allowed" : "pointer",
            height: 38,
          }}
        >
          {loading ? "Adding..." : "Add Room"}
        </button>
      </form>
      {error && <p style={{ color: "#EF4444", marginTop: 8, fontSize: 13 }}>{error}</p>}
    </div>
  );
};
