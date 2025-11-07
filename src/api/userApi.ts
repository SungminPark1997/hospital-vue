import api from "./axios"; // 공통 axios 인스턴스

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
