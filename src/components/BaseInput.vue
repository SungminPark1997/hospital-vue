<template>
  <div class="base-input">
    <label v-if="label" class="form-label">{{ label }}</label>
    <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="form-control"
      :class="{ 'is-invalid': error }"
      required
    />
    <small v-if="error" class="text-danger">{{ error }}</small>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  type: { type: String, default: "text" },
  modelValue: String,
  placeholder: String,
  error: String,
});
defineEmits(["update:modelValue"]);
</script>

<style scoped>
.base-input {
  margin-bottom: 12px;
  width: 100%;
}
.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: border-color 0.2s ease;
}
.form-control:focus {
  outline: none;
  border-color: #007bff;
}
.is-invalid {
  border-color: #dc3545;
}
.text-danger {
  font-size: 0.85rem;
}
.form-label {
  font-weight: 600;
  margin-bottom: 4px;
  display: inline-block;
}
</style>
