import { ref } from "vue";
import { getSearchHospitals, type Hospital } from "../api/hospitalApi";

/**
 * 🏥 병원 검색 로직 전용 composable
 * - 검색 상태 관리
 * - 로딩 상태
 * - API 호출
 */
export function useHospitalSearch() {
  //  상태 정의
  const keyword = ref("");
  const selectedRegion = ref("");
  const status = ref("");
  const hospitals = ref<Hospital[]>([]);
  const isLoading = ref(false);
  const totalPages = ref(0);
  const currentPage = ref(1);
  const hasSearched = ref(false);

  //  정렬 상태
  const sortKey = ref("created_at");
  const sortOrder = ref("DESC");

  //  검색 함수
  const searchHospitals = async (
    payload: { keyword: string; region: string; status: string },
    page = 1
  ) => {
    isLoading.value = true;
    try {
      const res = await getSearchHospitals(
        payload.keyword || "",
        payload.region || "",
        payload.status || "",
        page,
        undefined, //  size는 서버 기본값(10) 사용
        sortKey.value || undefined, //  선택적으로만 전달
        sortOrder.value || undefined
      );

      hospitals.value = res.content;
      totalPages.value = res.totalPages;
      currentPage.value = res.page;
      console.log("병원 검색 결과:", res);
    } catch (error) {
      console.error("병원 검색 실패:", error);
    } finally {
      isLoading.value = false;
      hasSearched.value = true;
    }
  };

  //  초기화 함수
  const clearSearch = () => {
    keyword.value = "";
    selectedRegion.value = "";
    status.value = "";
    hospitals.value = [];
    totalPages.value = 0;
    currentPage.value = 1;
    sortKey.value = "created_at";
    sortOrder.value = "DESC";
  };

  //  페이지 변경
  const onPageChange = async (page: number) => {
    await searchHospitals(
      {
        keyword: keyword.value,
        region: selectedRegion.value,
        status: status.value,
      },
      page
    );
  };

  return {
    // 상태
    keyword,
    selectedRegion,
    status,
    hospitals,
    isLoading,
    totalPages,
    currentPage,
    hasSearched,
    sortKey,
    sortOrder, // ✅ 정렬 상태 추가 (다른 컴포넌트에서 조작 가능)
    // 메서드
    searchHospitals,
    clearSearch,
    onPageChange,
  };
}
