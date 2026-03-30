import React from "react";
import type { RoomDetail } from "../services/roomDetailApi";

interface RoomDetailsTableProps {
  rooms: RoomDetail[];
  loading: boolean;
  onUpdateClick: (room: RoomDetail) => void;
  onDeleteClick: (room: RoomDetail) => void;
}

export const RoomDetailsTable: React.FC<RoomDetailsTableProps> = ({
  rooms,
  loading,
  onUpdateClick,
  onDeleteClick,
}) => {
  const thStyle: React.CSSProperties = {
    padding: "12px 16px",
    textAlign: "left",
    fontWeight: 600,
    fontSize: 13,
    color: "#6B7280",
    borderBottom: "2px solid #E5E7EB",
    background: "#F9FAFB",
  };

  const tdStyle: React.CSSProperties = {
    padding: "12px 16px",
    fontSize: 14,
    borderBottom: "1px solid #F3F4F6",
    color: "#111827",
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
        overflow: "hidden",
        marginBottom: 32,
      }}
    >
      <div style={{ padding: "16px 24px", borderBottom: "1px solid #E5E7EB" }}>
        <h3 style={{ fontWeight: 600, fontSize: 18, margin: 0 }}>
          All Rooms{" "}
          <span style={{ fontSize: 14, fontWeight: 400, color: "#6B7280" }}>
            ({rooms.length} total)
          </span>
        </h3>
      </div>

      {loading ? (
        <div style={{ padding: 40, textAlign: "center", color: "#6B7280" }}>Loading rooms...</div>
      ) : rooms.length === 0 ? (
        <div style={{ padding: 40, textAlign: "center", color: "#6B7280" }}>
          No rooms found. Add a new room above.
        </div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={thStyle}>#</th>
              <th style={thStyle}>Room No</th>
              <th style={thStyle}>Floor No</th>
              <th style={thStyle}>Room Type</th>
              <th style={thStyle}>Created At</th>
              <th style={thStyle}>Updated At</th>
              <th style={{ ...thStyle, textAlign: "center" }}>Update</th>
              <th style={{ ...thStyle, textAlign: "center" }}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room, idx) => (
              <tr key={room.id} style={{ background: idx % 2 === 0 ? "#fff" : "#FAFBFC" }}>
                <td style={tdStyle}>{idx + 1}</td>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{room.room_no}</td>
                <td style={tdStyle}>{room.floor_no}</td>
                <td style={tdStyle}>
                  <span
                    style={{
                      background: "#EFF6FF",
                      color: "#2563EB",
                      padding: "2px 10px",
                      borderRadius: 12,
                      fontSize: 13,
                      fontWeight: 500,
                    }}
                  >
                    {room.room_type}
                  </span>
                </td>
                <td style={{ ...tdStyle, fontSize: 13, color: "#6B7280" }}>
                  {room.created_at ? new Date(room.created_at).toLocaleDateString() : "-"}
                </td>
                <td style={{ ...tdStyle, fontSize: 13, color: "#6B7280" }}>
                  {room.updated_at ? new Date(room.updated_at).toLocaleDateString() : "-"}
                </td>
                <td style={{ ...tdStyle, textAlign: "center" }}>
                  <button
                    onClick={() => onUpdateClick(room)}
                    style={{
                      background: "#F59E0B",
                      color: "#fff",
                      border: "none",
                      borderRadius: 6,
                      padding: "6px 16px",
                      fontWeight: 500,
                      fontSize: 13,
                      cursor: "pointer",
                    }}
                  >
                    Update
                  </button>
                </td>
                <td style={{ ...tdStyle, textAlign: "center" }}>
                  <button
                    onClick={() => onDeleteClick(room)}
                    style={{
                      background: "#EF4444",
                      color: "#fff",
                      border: "none",
                      borderRadius: 6,
                      padding: "6px 16px",
                      fontWeight: 500,
                      fontSize: 13,
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
