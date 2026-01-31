import React from "react";

export type BedStatus = "available" | "occupied" | "reserved" | "maintenance";

interface BedInfo {
  id: string;
  status: BedStatus;
  guestName?: string;
  guestProfileUrl?: string;
  checkIn?: string;
  checkOut?: string;
}

interface RoomCardProps {
  roomNumber: string;
  type: string;
  status: "empty" | "partial" | "full" | "maintenance" | "reserved";
  beds: BedInfo[];
  onBook?: (bedId: string) => void;
  onViewProfile?: (bedId: string) => void;
}

const statusColors = {
  empty: "#22C55E",
  partial: "#F59E42",
  full: "#EF4444",
  maintenance: "#F3F4F6",
  reserved: "#3B82F6",
};

export const RoomCard: React.FC<RoomCardProps> = ({
  roomNumber,
  type,
  status,
  beds,
  onBook,
  onViewProfile,
}) => (
  <div style={{
    background: "#fff",
    borderRadius: 12,
    padding: 16,
    minWidth: 220,
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
    border: `2px solid ${statusColors[status]}`,
    marginBottom: 16,
  }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontWeight: 700, fontSize: 18 }}>Room {roomNumber}</span>
      <span style={{ fontSize: 13, color: "#6B7280" }}>{type}</span>
      <span style={{
        background: statusColors[status],
        color: status === "maintenance" ? "#6B7280" : "#fff",
        borderRadius: 6,
        padding: "2px 8px",
        fontSize: 12,
        fontWeight: 600,
      }}>{status.toUpperCase()}</span>
    </div>
    <div style={{ marginTop: 12 }}>
      {beds.map((bed) => (
        <div key={bed.id} style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
          <span style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: bed.status === "available" ? "#22C55E" : bed.status === "occupied" ? "#EF4444" : bed.status === "reserved" ? "#3B82F6" : "#F3F4F6",
            display: "inline-block",
            marginRight: 8,
          }} />
          <span style={{ fontWeight: 500, fontSize: 14 }}>
            {bed.status === "available" ? "Empty" : bed.guestName || "Reserved / Repairing"}
          </span>
          {bed.status === "available" && onBook && (
            <button style={{ marginLeft: "auto", background: "#2563EB", color: "#fff", borderRadius: 6, padding: "4px 12px", border: "none", cursor: "pointer" }} onClick={() => onBook(bed.id)}>
              Book Now
            </button>
          )}
          {bed.status === "occupied" && bed.guestProfileUrl && onViewProfile && (
            <a style={{ marginLeft: "auto", color: "#2563EB", fontWeight: 500, fontSize: 13, textDecoration: "underline", cursor: "pointer" }} href={bed.guestProfileUrl} target="_blank" rel="noopener noreferrer">
              View Profile
            </a>
          )}
        </div>
      ))}
    </div>
  </div>
);
