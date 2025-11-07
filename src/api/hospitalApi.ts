import api from "./axios";

export interface Stats {
  total: number;
  open: number;
  closed: number;
}

export interface Hospital {
  id: number;
  bizName: string;
  bizType: string;
  statusCode: number | null;
  detailStatusCode: number | null;
  detailStatusName: string | null;
  tel: string | null;
  lotAddr: string | null;
  roadAddr: string | null;
  roadZip: string | null;
  xcoord: number | null;
  ycoord: number | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface HospitalCreateRequest {
  bizName: string;
  bizType: string;
  statusCode?: number | null;
  detailStatusCode?: number | null;
  detailStatusName?: string | null;
  tel?: string | null;
  lotAddr?: string | null;
  roadAddr?: string | null;
  roadZip?: string | null;
  xcoord?: number | null;
  ycoord?: number | null;
}

export interface HospitalUpdateRequest extends HospitalCreateRequest {
  id: number; // 수정 시에는 반드시 있어야 함
}
export interface SearchResponse {
  content: Hospital[];
  total: number;
  page: number;
  size: number;
  totalPages: number;
}
export type Status = "" | "OPEN" | "CLOSED";

export async function getHospitalStats(): Promise<Stats> {
  const { data } = await api.get<Stats>("/hospitals/stats");
  console.log("병원 통계 데이터:", data);
  return data;
}

export async function getRecentHospitals(): Promise<Hospital[]> {
  const { data } = await api.get<Hospital[]>("/hospitals/recent");
  console.log("최근 등록 병원 데이터:", data);
  return data;
}

export async function getSearchHospitals(
  keyword: string,
  region: string,
  status: string,
  page = 1,
  size = 10,
  sortKey = "created_at", // ✅ 기본값
  sortOrder = "DESC" // ✅ 기본값
): Promise<SearchResponse> {
  const params: Record<string, string | number> = {
    page,
    size,
    sortKey,
    sortOrder,
  };

  if (keyword) params.keyword = keyword;
  if (region) params.region = region;
  if (status) params.status = status;

  const { data } = await api.get<SearchResponse>("/hospitals/search", {
    params,
  });
  return data;
}

export async function createHospital(
  hospital: HospitalCreateRequest
): Promise<{ success: boolean; message: string }> {
  const { data } = await api.post<{ success: boolean; message: string }>(
    "/hospitals",
    hospital
  );
  return data;
}

export async function updateHospital(
  id: number,
  hospital: HospitalCreateRequest // 수정 내용
): Promise<{ success: boolean; message: string }> {
  const { data } = await api.put<{ success: boolean; message: string }>(
    `/hospitals/${id}`, // ✅ 수정 대상 식별
    hospital // ✅ 수정할 내용 전달
  );
  return data;
}

export async function deleteHospital(
  id: number
): Promise<{ success: boolean; message: string }> {
  const { data } = await api.delete<{ success: boolean; message: string }>(
    `/hospitals/${id}` // ✅ 삭제 대상 id
  );
  return data;
}
