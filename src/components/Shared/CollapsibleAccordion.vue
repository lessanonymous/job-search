<template>
  <div class="border-b border-solid border-brand-gray-2 py-5">
    <div
      role="button"
      class="flex flex-wrap items-center justify-between"
      @click="open"
    >
      <h3 class="text-base font-semibold">{{ header }}</h3>
      <FontAwesomeIcon :icon="caretIcon" />
    </div>

    <div class="mt-5 w-full" v-if="isOpen">
      <slot>Default slot is empty</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

defineProps({
  header: {
    type: String,
    required: true,
  },
});

const isOpen = ref(false);

const open = () => {
  isOpen.value = !isOpen.value;
};

const caretIcon = computed(() => {
  return isOpen.value ? ["fas", "angle-up"] : ["fas", "angle-down"];
});
</script>
