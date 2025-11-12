<template>
  <div class="stats">
    <StatItem label="전체 병원" :value="stats.total" />
    <StatItem label="운영 중" :value="stats.open" color="ok" />
    <StatItem label="휴업 중" :value="stats.closed" color="warn" />
  </div>
</template>

<script setup lang="ts">
import StatItem from "./StatItem.vue";
import type { Stats } from "../api/hospitalApi";
defineProps<{ stats: Stats }>();
</script>

<style scoped>
.stats {
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
}
</style>
