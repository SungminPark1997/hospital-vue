<script setup lang="ts">
import { onMounted } from "vue";
// @ts-ignore 캐시 때문에 잠깐
import Header from "./components/Header.vue";

import { registerVisit } from "./api/visitApi";
// 처음 마운트 되었을 시점에 방문 기록을 남긴다   (세션 스토리지 활용)
onMounted(async () => {
  if (!sessionStorage.getItem("visited")) {
    try {
      const res = await registerVisit();
      console.log("방문 기록 등록:", res);
      sessionStorage.setItem("visited", "true");
    } catch (err) {
      console.error("방문 기록 등록 실패:", err);
    }
  }
});
</script>

<template>
  <Header />
  <div class="main-area">
    <router-view />
  </div>
</template>

<style scoped></style>
