<template>
  <div class="stat-item">
    <div class="stat__label">{{ label }}</div>
    <div class="stat__value" :class="colorClass">{{ value }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  label: string;
  value: number;
  color?: "default" | "ok" | "warn";
}>();

const colorClass = computed(() => {
  switch (props.color) {
    case "ok":
      return "ok";
    case "warn":
      return "warn";
    default:
      return "";
  }
});
</script>

<style scoped>
.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.stat__label {
  color: #666;
  font-size: 0.9rem;
}
.stat__value {
  font-size: 1.5rem;
  font-weight: bold;
}
.stat__value.ok {
  color: #198754;
}
.stat__value.warn {
  color: #dc3545;
}
</style>
