<template>
  <nav class="pagination">
    <PageButton :disabled="page === 1" @click="emit('change', page - 1)">
      ◀ 이전
    </PageButton>

    <PageButton
      v-for="p in pages"
      :key="p"
      :active="p === page"
      @click="emit('change', p)"
      class="num"
    >
      {{ p }}
    </PageButton>

    <PageButton
      :disabled="page === totalPages"
      @click="emit('change', page + 1)"
    >
      다음 ▶
    </PageButton>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";
import PageButton from "./PageButton.vue";

const props = defineProps<{
  page: number;
  totalPages: number;
}>();

const emit = defineEmits<{
  (e: "change", page: number): void;
}>();

const pages = computed(() => {
  const total = props.totalPages;
  const current = props.page;
  const perBlock = 5; // 한 번에 보여줄 페이지 수

  // 현재 블록 계산 (예: 1~5, 6~10, 11~15 ...)
  const block = Math.floor((current - 1) / perBlock);
  const start = block * perBlock + 1;
  const end = Math.min(start + perBlock - 1, total);

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin-top: 14px;
}
</style>
