<template>
  <JobFiltersSidebarCheckboxGroup
    :uniqueValues="UNIQUE_DEGREES"
    :action="userStore.ADD_SELECTED_DEGREES"
  />
</template>

<script lang="ts" setup>
import JobFiltersSidebarCheckboxGroup from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue";
import { useUserStore } from "@/stores/user";
import { useDegreeStore } from "@/stores/degree";
import { computed } from "vue";

const userStore = useUserStore();
const degreeStore = useDegreeStore();

const UNIQUE_DEGREES = computed(() => degreeStore.UNIQUE_DEGREES);
</script>
