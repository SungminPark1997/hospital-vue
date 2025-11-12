import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081/api",
  timeout: 8000,
});
delete api.defaults.headers.post["Content-Type"];
export default api;
