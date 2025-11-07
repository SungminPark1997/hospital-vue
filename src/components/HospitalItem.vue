<!-- 📁 src/components/RecentHospitalItem.vue -->
<template>
  <li class="recent__item" @click="emit('select', hospital)">
    <div class="recent__name">{{ hospital.bizName }}</div>
    <div class="recent__addr">{{ hospital.roadAddr || "주소 정보 없음" }}</div>
  </li>
</template>

<script setup lang="ts">
import type { Hospital } from "../api/hospitalApi";

// 부모로부터 병원 1개 데이터 전달받음
const props = defineProps<{
  hospital: Hospital;
}>();

// 클릭 시 선택 이벤트 발생
const emit = defineEmits<{
  (e: "select", hospital: Hospital): void;
}>();
</script>

<style scoped>
.recent__item {
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: #fff;
  cursor: pointer;
  transition: background 0.2s ease;
}
.recent__item:hover {
  background: #f9fafc;
}
.recent__name {
  font-weight: 600;
}
.recent__addr {
  color: var(--muted);
  font-size: 13px;
  margin-top: 2px;
}
</style>
