<template>
  <div class="h-16 w-full border-b border-solid border-brand-gray-1 bg-white">
    <div class="flex h-full items-center px-8">
      <div v-if="onJobsResultsPage">
        <FontAwesomeIcon class="mr-3" :icon="['fas', 'search']" />
        <span>
          <span class="text-brand-green-1">{{ FILTERED_JOBS.length }}</span>
          jobs matched
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useJobStore } from "@/stores/job";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const jobStore = useJobStore();
const FILTERED_JOBS = computed(() => {
  return jobStore.FILTERED_JOBS;
});

const onJobsResultsPage = computed(() => {
  return route.name === "JobResults";
});
</script>
