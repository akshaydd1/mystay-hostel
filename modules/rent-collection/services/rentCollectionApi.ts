const BASE_URL = "http://localhost:5125/api/RentCollection";

export interface RentCollectionRecord {
  id: number;
  student_id: number;
  room_id: number;
  total_rent: number;
  paid_rent: number;
  status: string;
  balance_rent: number;
  created_at?: string;
  updated_at?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export async function fetchAllRentCollections(): Promise<RentCollectionRecord[]> {
  const res = await fetch(`${BASE_URL}/view`);
  if (!res.ok) throw new Error("Failed to fetch rent collections");
  const json: ApiResponse<RentCollectionRecord[]> = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.data;
}

export async function fetchRentCollectionById(id: number): Promise<RentCollectionRecord> {
  const res = await fetch(`${BASE_URL}/view/${id}`);
  if (!res.ok) throw new Error("Failed to fetch rent collection");
  const json: ApiResponse<RentCollectionRecord> = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.data;
}

export async function insertRentCollection(data: {
  student_id: number;
  room_id: number;
  total_rent: number;
  paid_rent: number;
}): Promise<RentCollectionRecord> {
  const res = await fetch(`${BASE_URL}/insert`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to insert rent collection");
  const json: ApiResponse<RentCollectionRecord> = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.data;
}

export async function updateRentCollection(
  id: number,
  data: {
    student_id?: number;
    room_id?: number;
    total_rent?: number;
    paid_rent?: number;
    status?: string;
  }
): Promise<RentCollectionRecord> {
  const res = await fetch(`${BASE_URL}/update/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update rent collection");
  const json: ApiResponse<RentCollectionRecord> = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.data;
}

export async function deleteRentCollection(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/delete/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete rent collection");
  const json: ApiResponse<string> = await res.json();
  if (!json.success) throw new Error(json.message);
}
