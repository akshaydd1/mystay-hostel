const BASE_URL = "http://localhost:5125/api/RoomDetail";

export interface RoomDetail {
  id: number;
  room_no: string;
  floor_no: number;
  room_type: string;
  created_at?: string;
  updated_at?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export async function fetchAllRooms(): Promise<RoomDetail[]> {
  const res = await fetch(`${BASE_URL}/view`);
  if (!res.ok) throw new Error("Failed to fetch rooms");
  const json: ApiResponse<RoomDetail[]> = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.data;
}

export async function fetchRoomById(id: number): Promise<RoomDetail> {
  const res = await fetch(`${BASE_URL}/view/${id}`);
  if (!res.ok) throw new Error("Failed to fetch room");
  const json: ApiResponse<RoomDetail> = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.data;
}

export async function insertRoom(data: {
  room_no: string;
  floor_no: number;
  room_type: string;
}): Promise<RoomDetail> {
  const res = await fetch(`${BASE_URL}/insert`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to insert room");
  const json: ApiResponse<RoomDetail> = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.data;
}

export async function updateRoom(
  id: number,
  data: { room_no?: string; floor_no?: number; room_type?: string }
): Promise<RoomDetail> {
  const res = await fetch(`${BASE_URL}/update/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update room");
  const json: ApiResponse<RoomDetail> = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.data;
}

export async function deleteRoom(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/delete/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete room");
  const json: ApiResponse<string> = await res.json();
  if (!json.success) throw new Error(json.message);
}
