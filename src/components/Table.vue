<template>
  <div class="table-responsive">
    <table class="table table-hover align-middle text-center hospital-table">
      <thead class="table-light align-middle">
        <tr>
          <th
            v-for="header in headers"
            :key="header.key"
            :style="{ width: header.width }"
            @click="$emit('sort', header.key)"
            class="sortable-header"
          >
            <span
              class="d-inline-flex align-items-center justify-content-center"
            >
              <span class="header-label">{{ header.label }}</span>
              <span class="sort-icon ms-1">
                <BIconCaretUpFill
                  v-if="sortKey === header.key && sortOrder === 'ASC'"
                />
                <BIconCaretDownFill
                  v-if="sortKey === header.key && sortOrder === 'DESC'"
                />
                <span v-else class="icon-placeholder"></span>
              </span>
            </span>
          </th>
          <th style="width: 80px">삭제</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="h in hospitals"
          :key="h.id"
          @click="$emit('select', h)"
          style="cursor: pointer"
        >
          <td>{{ h.id }}</td>
          <td class="fw-semibold text-truncate" title="병원명">
            {{ h.bizName }}
          </td>
          <td>{{ h.bizType }}</td>
          <td>
            <span
              class="badge"
              :class="{
                'bg-success': h.detailStatusName === '영업중',
                'bg-secondary': h.detailStatusName !== '영업중',
              }"
            >
              {{ h.detailStatusName || "-" }}
            </span>
          </td>
          <td>{{ h.tel || "-" }}</td>
          <td class="text-start text-truncate" title="주소">
            {{ h.roadAddr || h.lotAddr || "주소 없음" }}
          </td>
          <td class="small-text">{{ formatDate(h.createdAt) }}</td>
          <td class="small-text">{{ formatDate(h.updatedAt) }}</td>
          <td>
            <button
              class="btn btn-outline-danger btn-sm"
              @click.stop="$emit('delete', h.id)"
            >
              삭제
            </button>
          </td>
        </tr>

        <tr v-if="!isLoading && hospitals.length === 0">
          <td colspan="9" class="text-muted py-4">검색 결과가 없습니다.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { formatDate } from "../utils/date";
import { BIconCaretDownFill, BIconCaretUpFill } from "bootstrap-icons-vue";
import type { Hospital } from "../api/hospitalApi";

defineProps<{
  hospitals: Hospital[];
  isLoading: boolean;
  sortKey: string;
  sortOrder: string;
}>();

defineEmits<{
  (e: "sort", key: string): void;
  (e: "select", hospital: Hospital): void;
  (e: "delete", id: number): void;
}>();

// ✅ 고정 폭 지정
const headers = [
  { key: "id", label: "ID", width: "60px" },
  { key: "biz_name", label: "병원명", width: "150px" },
  { key: "biz_type", label: "종류", width: "100px" },
  { key: "detail_status_name", label: "상태", width: "90px" },
  { key: "tel", label: "전화번호", width: "130px" },
  { key: "road_addr", label: "도로명 주소", width: "260px" },
  { key: "created_at", label: "등록일", width: "120px" },
  { key: "updated_at", label: "수정일", width: "120px" },
];
</script>

<style scoped>
.hospital-table {
  table-layout: fixed; /* ✅ 셀 폭 고정 */
  width: 100%;
  font-size: 0.9rem;
}

.hospital-table th,
.hospital-table td {
  vertical-align: middle;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 헤더 클릭시 색상 효과 */
.sortable-header {
  user-select: none;
  cursor: pointer;
  transition: color 0.2s ease;
}
.sortable-header:hover {
  color: #0d6efd;
}

/*  제목 및 아이콘 정렬 */
.header-label {
  font-weight: 500;
}

.sort-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
}

.icon-placeholder {
  display: inline-block;
  width: 12px;
  height: 12px;
  opacity: 0;
}

/* 등록일, 수정일 글자 크기 축소 */
.small-text {
  font-size: 0.8rem;
  color: #555;
}

/* hover 효과 */
.table-hover tbody tr:hover {
  background-color: #f8f9fa;
}
</style>
