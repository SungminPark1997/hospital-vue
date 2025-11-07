<template>
  <button
    class="page-btn"
    :class="{ active, disabled }"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  active?: boolean;
  disabled?: boolean;
}>();
defineEmits(["click"]);
</script>

<style scoped>
.page-btn {
  padding: 6px 10px;
  border: 1px solid var(--border, #e6e8ec);
  background: #fff;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}
.page-btn:hover:not(:disabled) {
  background: #f5f7fb;
}
.page-btn.active {
  background: var(--brand, #00a2b3);
  color: #fff;
  border-color: var(--brand, #00a2b3);
}
.page-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.page-btn.num {
  width: 40px;
  text-align: center;
}
</style>
