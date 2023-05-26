<template>
  <input
    :value="modelValue"
    @input="handleInput"
    type="text"
    class="w-full text-lg font-normal focus:outline-none"
  />
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const handleInput = ($event: Event) => {
  const target = $event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>
