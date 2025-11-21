import api from "./axios"; // 공통 axios 인스턴스
export interface User {
  id: number;
  name: string;
}
interface RegisterResponse {
  success: boolean;
  message: string;
}

// ✅ 회원가입
export async function registerUser(payload: {
  username: string;
  password: string;
  role?: string;
}): Promise<RegisterResponse> {
  const { data } = await api.post<RegisterResponse>("/user/register", payload);
  return data;
}

// ✅ 로그인
export async function loginUser(payload: {
  username: string;
  password: string;
}) {
  const { data } = await api.post("/user/login", payload);
  return data;
}
export async function changePassword(payload: {
  username: string;
  oldPassword: string;
  newPassword: string;
}) {
  const { data } = await api.post("/user/change-password", payload);
  return data;
}

// ✅ 모든 사용자 정보 가져오기 (관리자용)
export async function getAllUsers() {
  const { data } = await api.get("/user/all");
  return data;
}
