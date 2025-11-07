import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081/api",
  timeout: 8000,
});

// 필요하면 인터셉터 추가
// api.interceptors.request.use((config) => config)
// api.interceptors.response.use((res) => res, (err) => Promise.reject(err))

export default api;
