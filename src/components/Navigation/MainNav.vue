<template>
  <header :class="['w-full', 'text-sm', headerHeightClass]">
    <div class="fixed left-0 top-0 h-16 w-full bg-white">
      <div
        class="mx-auto flex h-full flex-nowrap border-b border-solid border-brand-gray-1 px-8"
      >
        <RouterLink
          :to="{ name: 'Home' }"
          class="align flex h-full items-center text-xl"
          >Juju Careers
        </RouterLink>

        <nav class="ml-12 h-full">
          <ul class="flex h-full list-none">
            <li
              v-for="item in menuItems"
              :key="item.text"
              class="ml-9 h-full first:ml-0"
            >
              <RouterLink
                :to="item.url"
                class="flex h-full items-center py-2.5"
                >{{ item.text }}</RouterLink
              >
            </li>
          </ul>
        </nav>

        <div class="ml-auto flex h-full items-center">
          <ProfileImage v-if="isLoggedIn" />
          <ActionButton text="Sign in" @click="LOGIN_USER" v-else />
        </div>
      </div>

      <SubNav v-if="isLoggedIn" />
    </div>
  </header>
</template>

<script setup lang="ts">
import ActionButton from "@/components/Shared/ActionButton.vue";
import ProfileImage from "@/components/Navigation/ProfileImage.vue";
import SubNav from "@/components/Navigation/SubNav.vue";
import { useUserStore } from "@/stores/user";
import { computed, ref } from "vue";

const userStore = useUserStore();

const menuItems = ref([
  { text: "Teams", url: "/teams" },
  { text: "Locations", url: "/" },
  { text: "Life at Juju Careers", url: "/" },
  { text: "How we hire", url: "/" },
  { text: "Students", url: "/" },
  { text: "Jobs", url: "/jobs/results" },
]);

const LOGIN_USER = userStore.LOGIN_USER;

const isLoggedIn = computed(() => userStore.isLoggedIn);

const headerHeightClass = computed(() => {
  return {
    "h-16": !userStore.isLoggedIn,
    "h-32": userStore.isLoggedIn,
  };
});
</script>
