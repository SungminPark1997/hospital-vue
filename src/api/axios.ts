import axios from "axios";
import { useAuthStore } from "../store/authStore";

const api = axios.create({
  baseURL: "http://localhost:8081/api",
  timeout: 8000,
});
delete api.defaults.headers.post["Content-Type"];

// 요청 인터셉터 활용해서 토큰을 첨부하자
api.interceptors.request.use((req) => {
  const auth = useAuthStore();
  if (auth.token) {
    req.headers.Authorization = `Bearer ${auth.token}`;
  }
  return req;
});
export default api;

//  이미 라우터에서 막아서 일단은 넘어감
