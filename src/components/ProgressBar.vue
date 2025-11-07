<template>
  <div class="progress-card">
    <h3>🏥 운영률</h3>
    <div class="progress-bar">
      <div
        class="progress-fill"
        :style="{ width: `${rate}%` }"
        :class="{
          low: rate < 70,
          mid: rate >= 70 && rate < 90,
          high: rate >= 90,
        }"
      ></div>
    </div>

    <div class="progress-info">
      <span>{{ open }} / {{ total }} ({{ rate.toFixed(1) }}%)</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  total: number;
  open: number;
}>();

const rate = computed(() =>
  props.total > 0 ? (props.open / props.total) * 100 : 0
);
</script>

<style scoped>
.progress-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.progress-card h3 {
  margin: 0;
  font-size: 16px;
  color: #1f2937;
}

.progress-bar {
  width: 100%;
  height: 16px;
  background: #e6e8ec;
  border-radius: 999px;
  overflow: hidden;
  position: relative;
}

.progress-fill {
  height: 100%;
  border-radius: 999px;
  transition: width 0.4s ease;
}

.progress-fill.low {
  background: #f87171; /* 빨강 */
}
.progress-fill.mid {
  background: #fbbf24; /* 노랑 */
}
.progress-fill.high {
  background: #10b981; /* 초록 */
}

.progress-info {
  font-size: 13px;
  color: #6b7280;
  text-align: right;
}
</style>
