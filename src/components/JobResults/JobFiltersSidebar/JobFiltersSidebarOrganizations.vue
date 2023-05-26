<template>
  <JobFiltersSidebarCheckboxGroup
    :uniqueValues="UNIQUE_ORGANIZATIONS"
    :action="userStore.ADD_SELECTED_ORGANIZATIONS"
  />
</template>

<script setup lang="ts">
import JobFiltersSidebarCheckboxGroup from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue";
import { useJobStore } from "@/stores/job";
import { useUserStore } from "@/stores/user";
import { computed } from "vue";

const jobStore = useJobStore();
const userStore = useUserStore();

const UNIQUE_ORGANIZATIONS = computed(() => jobStore.UNIQUE_ORGANIZATIONS);
</script>
