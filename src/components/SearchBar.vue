<template>
  <div class="search-container">
    <!-- 검색 입력 영역 -->
    <div class="search-input-group">
      <input
        v-model="keyword"
        type="text"
        class="search-input"
        placeholder="병원명, 주소 또는 진료과목을 입력하세요"
        @keyup.enter="searchHospital"
      />
      <button class="btn" @click="searchHospital">검색</button>
      <button class="btn ghost sm" @click="clearSearch">초기화</button>
    </div>

    <!-- 필터 영역 -->
    <div class="filter-group">
      <select v-model="selectedRegion" class="chip">
        <option value="">전체 지역</option>
        <option v-for="g in regions" :key="g" :value="g">{{ g }}</option>
      </select>

      <select v-model="status" class="chip">
        <option value="">전체 상태</option>
        <option value="OPEN">운영중</option>
        <option value="CLOSED">폐업</option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const keyword = ref<string>("");
const selectedRegion = ref<string>("");
const status = ref<string>("");

const regions = [
  "강남구",
  "서초구",
  "송파구",
  "강동구",
  "마포구",
  "은평구",
  "노원구",
  "성북구",
  "용산구",
  "광진구",
  "동작구",
  "영등포구",
  "구로구",
  "강서구",
  "관악구",
];

const emit = defineEmits<{
  (
    e: "search",
    payload: { keyword: string; region: string; status: string }
  ): void;
  (e: "clear"): void;
}>();

const searchHospital = (): void => {
  emit("search", {
    keyword: keyword.value.trim(),
    region: selectedRegion.value,
    status: status.value,
  });
};

const clearSearch = (): void => {
  keyword.value = "";
  selectedRegion.value = "";
  status.value = "";
  emit("clear");
};
</script>

<style scoped>
/* 전체 컨테이너 */
.search-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

/* 입력 그룹 */
.search-input-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 검색 입력창 */
.search-input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid var(--border, #e6e8ec);
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}
.search-input:focus {
  border-color: var(--brand, #00a2b3);
}

/* 필터 그룹 */
.filter-group {
  display: flex;
  gap: 8px;
}

/* 필터 select (chip 스타일) */
.chip {
  padding: 8px 12px;
  border: 1px solid var(--border, #e6e8ec);
  background: #fff;
  color: var(--text, #1f2937);
  border-radius: 999px;
  cursor: pointer;
  font-size: 14px;
}
.chip:hover {
  border-color: var(--brand, #00a2b3);
  box-shadow: 0 0 0 3px rgba(0, 162, 179, 0.12);
}

/* 버튼 공통 */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 14px;
  border-radius: 10px;
  border: none;
  background: var(--brand, #00a2b3);
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.2s ease;
}
.btn:hover {
  background: #0093a2;
}
.btn.ghost {
  background: #fff;
  border: 1px solid var(--border, #e6e8ec);
  color: var(--text, #1f2937);
}
.btn.sm {
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 13px;
}
</style>
