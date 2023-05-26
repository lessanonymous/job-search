import { defineStore } from "pinia";
import getDegrees from "@/api/getDegrees";
import type { Degree } from "@/api/types";
import { ref, computed } from "vue";

export const useDegreeStore = defineStore("degree", () => {
  const degrees = ref<Degree[]>([]);

  const SET_DEGREES = async () => {
    degrees.value = await getDegrees();
  };

  const UNIQUE_DEGREES = computed(() =>
    degrees.value.map((degree) => degree.degree)
  );

  return {
    degrees,
    SET_DEGREES,
    UNIQUE_DEGREES,
  };
});
