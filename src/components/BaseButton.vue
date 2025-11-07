<template>
  <button :type="type" :class="['base-btn', color]" @click="$emit('click')">
    <slot />
  </button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: "button",
  },
  color: {
    type: String,
    default: "primary", // primary | success | danger | gray 등
  },
});
</script>

<style scoped>
.base-btn {
  width: 100%;
  padding: 10px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease;
}

.base-btn.primary {
  background-color: #007bff;
}
.base-btn.primary:hover {
  background-color: #0069d9;
}

.base-btn.success {
  background-color: #28a745;
}
.base-btn.success:hover {
  background-color: #218838;
}

.base-btn.danger {
  background-color: #dc3545;
}
.base-btn.danger:hover {
  background-color: #c82333;
}
</style>
