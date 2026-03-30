const BASE_URL = "http://localhost:5125/api/User";

export interface UserRecord {
  id: number;
  name: string;
  email: string;
  city?: string;
  state?: string;
  docType?: string;
  docNumber?: string;
  mobile_no?: string;
  createdAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export async function fetchAllUsers(): Promise<UserRecord[]> {
  const res = await fetch(`${BASE_URL}/view`);
  if (!res.ok) throw new Error("Failed to fetch users");
  const json: ApiResponse<UserRecord[]> = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.data;
}

export async function fetchUserById(id: number): Promise<UserRecord> {
  const res = await fetch(`${BASE_URL}/view/${id}`);
  if (!res.ok) throw new Error("Failed to fetch user");
  const json: ApiResponse<UserRecord> = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.data;
}
