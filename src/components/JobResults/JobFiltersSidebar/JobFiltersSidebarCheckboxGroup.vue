<template>
  <div class="mt-5">
    <fieldset>
      <ul class="flex flex-row flex-wrap">
        <li class="h-8 w-1/2" v-for="value in props.uniqueValues" :key="value">
          <input
            class="mr-3"
            type="checkbox"
            v-model="selectedValues"
            :value="value"
            :id="value"
            @change="selectValue"
          />
          <label :for="value">{{ value }}</label>
        </li>
      </ul>
    </fieldset>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useUserStore, CLEAR_USER_JOB_FILTER_SELECTIONS } from "@/stores/user";

const props = defineProps({
  uniqueValues: {
    type: [Set<string>, Array<string>],
    required: true,
  },
  action: {
    type: Function,
    required: true,
  },
});

const router = useRouter();
const userStore = useUserStore();

userStore.$onAction(({ after, name }) => {
  after(() => {
    if (name === CLEAR_USER_JOB_FILTER_SELECTIONS) {
      selectedValues.value = [];
    }
  });
});

const selectedValues = ref<string[]>([]);

const selectValue = () => {
  props.action(selectedValues.value);
  router.push({ name: "JobResults" });
};
</script>
