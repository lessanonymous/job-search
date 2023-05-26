<template>
  <JobFiltersSidebarCheckboxGroup
    :uniqueValues="UNIQUE_JOB_TYPES"
    :action="userStore.ADD_SELECTED_JOB_TYPES"
  />
</template>

<script setup lang="ts">
import JobFiltersSidebarCheckboxGroup from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue";
import { useJobStore } from "@/stores/job";
import { useUserStore } from "@/stores/user";
import { computed } from "vue";

const jobStore = useJobStore();
const userStore = useUserStore();

const UNIQUE_JOB_TYPES = computed(() => jobStore.UNIQUE_JOB_TYPES);
</script>
