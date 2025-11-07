<template>
  <div class="hospital-list">
    <!-- 제목 -->
    <div v-if="title" class="list__header">
      <h3>{{ title }}</h3>
    </div>

    <!-- 병원 목록 -->
    <ul class="list">
      <HospitalItem
        v-for="item in hospitals"
        :key="item.id"
        :hospital="item"
        @select="emit('select', $event)"
      />

      <li v-if="!hospitals.length" class="empty">
        {{ emptyText }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import HospitalItem from "./HospitalItem.vue";
import type { Hospital } from "../api/hospitalApi";

const props = defineProps<{
  hospitals: Hospital[];
  title?: string;
  emptyText?: string;
}>();

const emit = defineEmits<{ (e: "select", hospital: Hospital): void }>();
</script>

<style scoped>
.hospital-list {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 380px;
}

.list__header {
  padding-bottom: 10px;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
  scrollbar-width: thin;
}
.list::-webkit-scrollbar {
  width: 6px;
}
.list::-webkit-scrollbar-thumb {
  background-color: rgba(0, 162, 179, 0.4);
  border-radius: 6px;
}
.list::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 162, 179, 0.6);
}

.empty {
  color: var(--muted);
  text-align: center;
  padding: 12px 0;
}
</style>
