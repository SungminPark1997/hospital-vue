import api from "./axios";
interface VisitRecord {
  success: boolean;
  message: string;
}
interface VisitRecordResponse {
  success: boolean;
  message: string;
  count: number;
  data: any;
}

// 방문 기록 등록
export async function registerVisit() {
  const { data } = await api.get<VisitRecord>("/visit/record");
  return data;
}

// 오늘 방문 기록 조회
export async function getTodayVisits() {
  const { data } = await api.get<VisitRecordResponse>("/visit/today");
  return data;
}

// 전체 방문 기록 조회
export async function getAllVisits() {
  const { data } = await api.get<VisitRecordResponse>("/visit/all");
  return data;
}
