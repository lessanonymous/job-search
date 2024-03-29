import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import JobResultsView from "@/views/JobResultsView.vue";
import JobView from "@/views/JobView.vue";
import TeamsView from "@/views/TeamsView.vue";

const routes = [
  {
    path: "/",
    component: HomeView,
    name: "Home",
  },
  {
    path: "/jobs/results",
    component: JobResultsView,
    name: "JobResults",
  },
  {
    path: "/jobs/results/:id",
    component: JobView,
    name: "JobListing",
  },
  {
    path: "/teams",
    component: TeamsView,
    name: "Teams",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return {
      top: 0,
      left: 0,
      behavior: "smooth",
    };
  },
});

export default router;
