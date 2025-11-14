<template>
  <button :type="type" :class="['base-btn', color]" @click="emit('click')">
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

const emit = defineEmits(["click"]);
</script>

<style scoped>
.base-btn {
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
.base-btn.white {
  background-color: white;
  color: #007bff;
  border: 1px solid #007bff;
}

.base-btn.white:hover {
  background-color: wheat;
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
.base-btn.gray {
  background-color: #6c757d;
}
.base-btn.gray:hover {
  background-color: #5a6268;
}
</style>
