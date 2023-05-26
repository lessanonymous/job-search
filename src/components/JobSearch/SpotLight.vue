<template>
  <ul>
    <li v-for="spotlight in spotlights" :key="spotlight.id">
      <slot
        :img="spotlight.img"
        :title="spotlight.title"
        :description="spotlight.description"
      ></slot>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import axios from "axios";
import { ref, onMounted } from "vue";

interface SpotLight {
  id: number;
  img: string;
  title: string;
  description: string;
}

const spotlights = ref<SpotLight[]>([]);

const getSpotlights = async () => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const res = await axios.get<SpotLight[]>(`${baseUrl}/spotlights`);
  spotlights.value = res.data;
};

onMounted(getSpotlights);
</script>
