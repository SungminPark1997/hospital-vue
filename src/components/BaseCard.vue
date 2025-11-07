<template>
  <div class="card">
    <slot />
  </div>
</template>

<style scoped>
.card {
  background: #ffffff;
  border: 1px solid #e6e8ec;
  border-radius: 14px;
  padding: 18px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
}
</style>
