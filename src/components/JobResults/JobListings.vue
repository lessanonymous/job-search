<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <ol>
      <JobListing :key="job.id" v-for="job in displayedJobs" :job="job" />
    </ol>

    <div class="mx-auto mt-8">
      <div class="flex flex-row flex-nowrap">
        <p class="flex-grow text-sm">Page {{ currentPage }}</p>

        <div class="flex items-center justify-center">
          <RouterLink
            role="link"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            v-if="previousPage"
            :to="{
              name: 'JobResults',
              query: { page: previousPage },
            }"
            >Previous</RouterLink
          >

          <RouterLink
            role="link"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            v-if="nextPage"
            :to="{
              name: 'JobResults',
              query: { page: nextPage },
            }"
            >Next</RouterLink
          >
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import JobListing from "@/components/JobResults/JobListing.vue";
import { useJobStore } from "@/stores/job";
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import usePreviousAndNextPages from "@/composables/usePreviousAndNextPages";
import { useDegreeStore } from "@/stores/degree";

const jobStore = useJobStore();
const degreeStore = useDegreeStore();
const route = useRoute();

const FILTERED_JOBS = computed(() => jobStore.FILTERED_JOBS);

const currentPage = computed(() => {
  return parseInt((route?.query?.page as string) || "1");
});

const lastPage = computed(() => Math.ceil(FILTERED_JOBS.value.length / 10));

const { previousPage, nextPage } = usePreviousAndNextPages(
  currentPage,
  lastPage
);

const displayedJobs = computed(() => {
  const pageNumber = currentPage.value;
  const firstJobIndex = (pageNumber - 1) * 10;
  const lastJobIndex = pageNumber * 10;
  return FILTERED_JOBS.value.slice(firstJobIndex, lastJobIndex);
});

onMounted(jobStore.SET_JOBS);
onMounted(degreeStore.SET_DEGREES);
</script>
