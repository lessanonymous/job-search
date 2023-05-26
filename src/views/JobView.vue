<template>
  <div>Job page</div>
  <div>JobId: {{ currentJobId }}</div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const currentJobId = computed(() => route.params.id);
</script>
