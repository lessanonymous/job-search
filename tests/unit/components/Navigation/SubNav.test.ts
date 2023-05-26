import { render, screen } from "@testing-library/vue";
import SubNav from "@/components/Navigation/SubNav.vue";
import { createTestingPinia } from "@pinia/testing";
import { useJobStore } from "@/stores/job";
import { useRoute } from "vue-router";
import { type Mock, vi } from "vitest";

vi.mock("vue-router");

const useRouteMock = useRoute as Mock;

describe("SubNav", () => {
  const renderTheSubNav = () => {
    const pinia = createTestingPinia();
    const jobStore = useJobStore();

    render(SubNav, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });

    return { jobStore };
  };

  describe("when user is on job page", () => {
    it("displays job count", async () => {
      useRouteMock.mockReturnValue({
        name: "JobResults",
      });

      const { jobStore } = renderTheSubNav();
      const numberOfJobs = 15;
      // @ts-expect-error: Getter is read-only
      jobStore.FILTERED_JOBS = Array(numberOfJobs).fill({});

      const jobCount = await screen.findByText(numberOfJobs);
      expect(jobCount).toBeInTheDocument();
    });
  });

  describe("when user is not on job page", () => {
    it("does not display job count", () => {
      useRouteMock.mockReturnValue({
        name: "Home",
      });

      const { jobStore } = renderTheSubNav();
      const numberOfJobs = 15;
      // @ts-expect-error: Getter is read-only
      jobStore.FILTERED_JOBS = Array(numberOfJobs).fill({});

      const jobCount = screen.queryByText(numberOfJobs);
      expect(jobCount).not.toBeInTheDocument();
    });
  });
});
