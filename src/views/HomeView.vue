<template>
  <div class="home">
    <!-- 헤더 -->
    <header class="home__header">
      <div class="home__title">
        <h1>🏥 서울 병원 관리 시스템</h1>
        <p class="home__subtitle">
          빠르게 검색하고, 현황을 한눈에 보고, 관리까지 한 번에.
        </p>
      </div>
    </header>

    <!-- 검색 영역 -->
    <BaseCard class="search-card">
      <SearchBar
        v-model="keyword"
        :payload="{ region: selectedRegion, status: status }"
        placeholder="병원명, 주소, 진료과목으로 검색"
        @search="onSearch"
        @clear="clearSearch"
      />

      <HospitalList
        v-if="hasSearched"
        :hospitals="hospitals"
        title=""
        emptyText="검색 결과가 없습니다."
        @select="openModal"
      />

      <Pagination
        v-if="hasSearched && totalPages > 1"
        :page="currentPage"
        :totalPages="totalPages"
        @change="onPageChange"
      />
    </BaseCard>

    <!-- 통계 + 그래프 -->
    <section class="grid stats-section">
      <BaseCard>
        <div class="stats">
          <div class="stat">
            <div class="stat__label">전체 병원</div>
            <div class="stat__value">{{ stats.total }}</div>
          </div>
          <div class="stat">
            <div class="stat__label">운영 중</div>
            <div class="stat__value ok">{{ stats.open }}</div>
          </div>
          <div class="stat">
            <div class="stat__label">휴업 중</div>
            <div class="stat__value warn">{{ stats.closed }}</div>
          </div>
        </div>
      </BaseCard>

      <BaseCard class="graph-card">
        <ProgressBar :total="stats.total" :open="stats.open" />
      </BaseCard>
    </section>

    <!-- 최근 등록 병원 -->
    <BaseCard class="recent-section">
      <HospitalList
        :hospitals="recentHospitals"
        title="🆕 최근 등록 병원"
        emptyText="최근 등록된 병원이 없습니다."
        @select="openModal"
      />
    </BaseCard>

    <!-- 모달 -->
    <Modal
      v-if="selectedHospital"
      :hospital="selectedHospital"
      @close="closeModal"
    />

    <!-- 로딩 -->
    <div v-if="isLoading" class="loading-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import "../assets/styles/home.css";
import { ref, onMounted } from "vue";

import SearchBar from "../components/SearchBar.vue";
import Modal from "../components/modal/HospitalInfModal.vue";
import ProgressBar from "../components/ProgressBar.vue";
import BaseCard from "../components/BaseCard.vue";
import HospitalList from "../components/HospitalList.vue";
import Pagination from "../components/Pagination.vue";
import {
  getHospitalStats,
  getRecentHospitals,
  type Hospital,
} from "../api/hospitalApi";
import { useHospitalSearch } from "../composables/useHospitalSearch";

const {
  keyword,
  selectedRegion,
  status,
  hospitals,
  isLoading,
  totalPages,
  currentPage,
  searchHospitals,
  clearSearch,
  onPageChange,
} = useHospitalSearch();

const recentHospitals = ref<Hospital[]>([]);
const selectedHospital = ref<Hospital | null>(null);
const hasSearched = ref(false);
const stats = ref({ total: 0, open: 0, closed: 0 });

// ✅ 검색 실행
const onSearch = async (payload: {
  keyword: string;
  region: string;
  status: string;
}) => {
  await searchHospitals(payload, 1);
  hasSearched.value = true;
};

// ✅ 페이지 변경

// ✅ 모달
const openModal = (hospital: Hospital) => {
  selectedHospital.value = hospital;
};
const closeModal = () => {
  selectedHospital.value = null;
};

// ✅ 초기 데이터 로드
onMounted(async () => {
  stats.value = await getHospitalStats();
  recentHospitals.value = await getRecentHospitals();
});
</script>
