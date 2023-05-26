import { screen, render } from "@testing-library/vue";
import JobListings from "@/components/JobResults/JobListings.vue";
import { RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { useJobStore } from "@/stores/job";
import { useRoute } from "vue-router";
import { vi, type Mock } from "vitest";
import { useDegreeStore } from "@/stores/degree";

vi.mock("vue-router");

const useRouteMock = useRoute as Mock;

describe("JobListings", () => {
  const renderJobListings = () => {
    const pinia = createTestingPinia();
    setActivePinia(pinia);

    const jobStore = useJobStore();
    const degreeStore = useDegreeStore();
    // @ts-expect-error
    jobStore.FILTERED_JOBS = Array(15).fill({});

    render(JobListings, {
      global: {
        plugins: [pinia],
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    return { jobStore, degreeStore };
  };

  it("fetches jobs", () => {
    useRouteMock.mockReturnValue({ query: {} });
    const { jobStore } = renderJobListings();

    expect(jobStore.SET_JOBS).toHaveBeenCalled();
  });

  it("fetches degrees", () => {
    useRouteMock.mockReturnValue({ query: {} });
    const { degreeStore } = renderJobListings();

    expect(degreeStore.SET_DEGREES).toHaveBeenCalled();
  });

  it("displays a maximum of 10 jobs", async () => {
    const queryParams = { page: "1" };
    useRouteMock.mockReturnValue({ query: { ...queryParams } });

    renderJobListings();

    const jobListings = await screen.findAllByRole("listitem");

    expect(jobListings).toHaveLength(10);
  });

  describe("when params exlude pagenumber", () => {
    it("displays the first page", async () => {
      const queryParams = { page: undefined };
      useRouteMock.mockReturnValue({ query: { ...queryParams } });

      renderJobListings();

      const pageText = screen.getByText("Page 1");

      expect(pageText).toBeInTheDocument();
    });
  });

  describe("when params include pagenumber", () => {
    it("displays page number", async () => {
      const queryParams = { page: "3" };
      useRouteMock.mockReturnValue({ query: { ...queryParams } });

      renderJobListings();

      const pageText = screen.getByText("Page 3");

      expect(pageText).toBeInTheDocument();
    });
  });

  describe("when user is on the first page", () => {
    it("does not show previous button", async () => {
      const queryParams = { page: "1" };
      useRouteMock.mockReturnValue({ query: { ...queryParams } });

      const { jobStore } = renderJobListings();

      // @ts-expect-error
      jobStore.FILTERED_JOBS = Array(50).fill({});

      await screen.findAllByRole("listitem");
      const previousLink = screen.queryByRole("link", {
        name: /previous/i,
      });

      expect(previousLink).not.toBeInTheDocument();
    });

    it("shows next button", async () => {
      const queryParams = { page: "1" };
      useRouteMock.mockReturnValue({ query: { ...queryParams } });

      const { jobStore } = renderJobListings();

      // @ts-expect-error
      jobStore.FILTERED_JOBS = Array(50).fill({});

      await screen.findAllByRole("listitem");
      const nextLink = screen.queryByRole("link", {
        name: /next/i,
      });
      expect(nextLink).toBeInTheDocument();
    });
  });

  describe("when user is on the last page", () => {
    it("does show previous button", async () => {
      const queryParams = { page: "2" };
      useRouteMock.mockReturnValue({ query: { ...queryParams } });

      renderJobListings();

      await screen.findAllByRole("listitem");
      const previousLink = screen.queryByRole("link", {
        name: /previous/i,
      });

      expect(previousLink).toBeInTheDocument();
    });

    it("does not show next button", async () => {
      const queryParams = { page: "2" };
      useRouteMock.mockReturnValue({ query: { ...queryParams } });

      renderJobListings();

      await screen.findAllByRole("listitem");
      const nextLink = screen.queryByRole("link", {
        name: /next/i,
      });
      expect(nextLink).not.toBeInTheDocument();
    });
  });
});
