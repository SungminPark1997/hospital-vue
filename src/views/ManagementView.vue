<template>
  <div class="hospital-table">
    <!--  검색 + 추가 -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <SearchBar
        v-model="keyword"
        :payload="{ region: selectedRegion, status: status }"
        placeholder="병원명 또는 주소로 검색"
        @search="searchHospitals"
        @clear="clearSearch"
      />

      <BaseButton @click="clickAddHospital"> 병원 추가 </BaseButton>
    </div>

    <!--  목록 -->
    <Table
      :hospitals="hospitals"
      :isLoading="isLoading"
      :sortKey="sortKey"
      :sortOrder="sortOrder"
      @sort="sortBy"
      @select="clickHospital"
      @delete="deleteHospitalById"
    />

    <!-- 페이지네이션 -->
    <Pagination
      v-if="hasSearched && totalPages > 1"
      :page="currentPage"
      :totalPages="totalPages"
      @change="onPageChange"
    />

    <!-- 병원 추가 모달 -->
    <HospitalFormModal
      v-if="isAddModalOpen"
      :isEdit="isEdit"
      :hospital="editHospital"
      @close="closeAddModal"
      @submit="handleAddHospital"
    />
  </div>
</template>
<script setup lang="ts">
import Pagination from "../components/Pagination.vue";
import SearchBar from "../components/SearchBar.vue";
import { useHospitalSearch } from "../composables/useHospitalSearch";
import { ref } from "vue";
import {
  createHospital,
  deleteHospital,
  updateHospital,
  type Hospital,
  type HospitalCreateRequest,
} from "../api/hospitalApi";
import HospitalFormModal from "../components/modal/HospitalFormModal.vue";
import Table from "../components/Table.vue";
// @ts-ignore 캐시
import BaseButton from "../components/BaseButton.vue";

// composable 호출
const {
  keyword,
  selectedRegion,
  status,
  hospitals,
  isLoading,
  totalPages,
  currentPage,
  hasSearched,
  searchHospitals,
  clearSearch,
  onPageChange,
  sortKey,
  sortOrder, // useHospitalSearch에서 가져옴
} = useHospitalSearch();

// 병원 추가 모달 상태
const isAddModalOpen = ref(false);
const isEdit = ref(false);
const editHospital = ref<Hospital | null>(null);

const clickHospital = (h: Hospital) => {
  isEdit.value = true;
  editHospital.value = h;
  openAddModal();
};

const clickAddHospital = () => {
  isEdit.value = false;
  editHospital.value = null;
  openAddModal();
};
const openAddModal = () => (isAddModalOpen.value = true);
const closeAddModal = () => (isAddModalOpen.value = false);

//  정렬 핸들러 (서버 호출 기반) 주소만 좀 엉망
const sortBy = (key: string) => {
  // 같은 컬럼을 다시 클릭하면 오름/내림 토글
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === "ASC" ? "DESC" : "ASC";
  } else {
    sortKey.value = key;
    sortOrder.value = "ASC";
  }

  // 정렬 변경 후 재검색
  searchHospitals({
    keyword: keyword.value,
    region: selectedRegion.value,
    status: status.value,
  });
};

// ✅ 병원 추가 및 수정
const handleAddHospital = async (data: Hospital) => {
  if (!data.bizName) {
    alert("병원명을 입력해주세요.");
    return;
  }

  if (!data.bizType) {
    alert("병원 종류를 입력해주세요.");
    return;
  }

  const newHospital: HospitalCreateRequest = {
    bizName: data.bizName,
    bizType: data.bizType,
    statusCode: data.statusCode ?? null,
    detailStatusCode: data.detailStatusCode ?? null,
    detailStatusName: data.detailStatusName ?? null,
    tel: data.tel || "",
    lotAddr: data.lotAddr || "",
    roadAddr: data.roadAddr || "",
    roadZip: data.roadZip || null,
    xcoord: data.xcoord ?? null,
    ycoord: data.ycoord ?? null,
  };

  try {
    let res;
    if (isEdit.value && editHospital.value?.id) {
      res = await updateHospital(editHospital.value.id, newHospital);
      if (res.success) alert("✏️ 병원 정보가 성공적으로 수정되었습니다.");
      else {
        alert("⚠️ 수정 실패: " + res.message);
        return;
      }
    } else {
      res = await createHospital(newHospital);
      if (res.success) alert("✅ 병원이 성공적으로 등록되었습니다.");
      else {
        alert("⚠️ 등록 실패: " + res.message);
        return;
      }
    }

    //  등록 또는 수정 후 목록 새로고침
    await searchHospitals({ keyword: "", region: "", status: "" }, 1);

    //  모달 닫기 및 상태 초기화
    isAddModalOpen.value = false;
    isEdit.value = false;
    editHospital.value = null;
    sortKey.value = "created_at";
  } catch (error) {
    console.error("서버 오류:", error);
    alert("서버 오류가 발생했습니다.");
  }
};

// ✅ 삭제
const deleteHospitalById = async (id: number) => {
  if (!confirm("정말 이 병원을 삭제하시겠습니까?")) return;

  try {
    const res = await deleteHospital(id);

    if (res.success) {
      alert("🗑 병원이 성공적으로 삭제되었습니다.");
      await searchHospitals({ keyword: "", region: "", status: "" }, 1);
    } else {
      alert("⚠️ 삭제 실패: " + res.message);
    }
  } catch (error) {
    console.error("삭제 중 오류:", error);
    alert("서버 오류가 발생했습니다.");
  }
};
</script>

<style scoped>
.hospital-table {
  background: #fff;
  padding: 18px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  font-size: 0.9rem; /* 🔹 전체 텍스트 크기 축소 */
}

.table th,
.table td {
  padding: 0.55rem; /* 🔹 셀 간격도 약간 줄임 */
  font-size: 0.85rem;
}

.badge {
  font-size: 0.8rem;
  padding: 0.35em 0.55em;
}

.btn {
  font-size: 0.85rem;
  padding: 0.4rem 0.8rem;
}
tr {
  cursor: pointer;
}
tr:hover {
  background-color: #f8f9fa; /* hover 시 색상 변경 */
}
h2,
h3,
h4,
h5 {
  font-size: 1rem; /* 🔹 모달 헤더 등 제목 크기 통일 */
}
</style>
