<template>
  <li class="mb-7">
    <RouterLink
      :to="jobPageLink"
      class="mx-auto block rounded border border-solid border-brand-gray-2 bg-white hover:shadow-gray"
    >
      <div class="mx-8 border-b border-solid border-brand-gray-2 pb-2 pt-5">
        <h2 class="mb-2 text-2xl">{{ job.title }}</h2>

        <div class="flex flex-row align-middle">
          <div class="mr-5">
            <span>{{ job.organization }}</span>
          </div>

          <div>
            <ul>
              <li
                class="mr-5 inline-block"
                v-for="location in job.locations"
                :key="location"
              >
                {{ location }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="px-8 py-4">
        <div>
          <h3 class="mb-2 mt-1">Qualifications:</h3>

          <div>
            <ul class="list-disc pl-8">
              <li
                v-for="qualification in job.minimumQualifications"
                :key="qualification"
              >
                {{ qualification }}
              </li>
            </ul>
          </div>

          <div class="mt-2 text-center">
            <RouterLink class="text-brand-blue-1" :to="jobPageLink"
              >Expand</RouterLink
            >
          </div>
        </div>
      </div>
    </RouterLink>
  </li>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import type { PropType } from "vue";
import type { Job } from "@/api/types";

const props = defineProps({
  job: {
    required: true,
    type: Object as PropType<Job>,
  },
});

const jobPageLink = computed(() => `/jobs/results/${props.job.id}`);
</script>
