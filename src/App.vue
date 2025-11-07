<script setup lang="ts">
import Header from "./components/Header.vue";
</script>

<template>
  <Header></Header>
  <div class="main-area">
    <router-view />
  </div>
</template>

<style scoped></style>
