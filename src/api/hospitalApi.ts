import api from "./axios";
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

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

export interface SearchResponse {
  content: Hospital[];
  total: number;
  page: number;
  size: number;
  totalPages: number;
}
export type Status = "" | "OPEN" | "CLOSED";
// 병원 통계
export async function getHospitalStats(): Promise<Stats> {
  const { data } = await api.get<ApiResponse<Stats>>("/hospitals/stats");
  return data.data; // ✅ ApiResponse 안의 data 반환
}

// 최근 등록 병원
export async function getRecentHospitals(): Promise<Hospital[]> {
  const { data } = await api.get<ApiResponse<Hospital[]>>("/hospitals/recent");
  return data.data;
}

// 검색
export async function getSearchHospitals(
  keyword: string,
  region: string,
  status: string,
  page = 1,
  size = 10,
  sortKey = "created_at",
  sortOrder = "DESC"
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

  const { data } = await api.get<ApiResponse<SearchResponse>>(
    "/hospitals/search",
    { params }
  );
  return data.data;
}

// 등록
export async function createHospital(
  hospital: HospitalCreateRequest
): Promise<ApiResponse<null>> {
  const { data } = await api.post<ApiResponse<null>>("/hospitals", hospital);
  return data;
}

// 수정
export async function updateHospital(
  id: number,
  hospital: HospitalCreateRequest
): Promise<ApiResponse<null>> {
  const { data } = await api.put<ApiResponse<null>>(
    `/hospitals/${id}`,
    hospital
  );
  return data;
}

// 삭제
export async function deleteHospital(id: number): Promise<ApiResponse<null>> {
  const { data } = await api.delete<ApiResponse<null>>(`/hospitals/${id}`);
  return data;
}

// 액티브 병원
export async function getActiveHospitals(): Promise<Hospital[]> {
  const { data } = await api.get<ApiResponse<Hospital[]>>("/hospitals/active");
  return data.data;
}
