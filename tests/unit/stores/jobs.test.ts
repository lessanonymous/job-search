import { useJobStore } from "@/stores/job";
import { useUserStore } from "@/stores/user";
import { createPinia, setActivePinia } from "pinia";
import axios from "axios";
import { vi } from "vitest";
import type { Mock } from "vitest";
import { createJob } from "tests/utils/createJob";
vi.mock("axios");

const axiosGetMock = axios.get as Mock;

describe("state", () => {
  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);
  });

  it("stores job listings", () => {
    const store = useJobStore();

    expect(store.jobs).toEqual([]);
  });
});

describe("actions", () => {
  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);
  });

  describe("SET_JOBS", () => {
    it("makes api request and stores received jobs", async () => {
      axiosGetMock.mockResolvedValue({
        data: [
          {
            id: 1,
            title: "Vue Engineer",
          },
        ],
      });

      const store = useJobStore();
      await store.SET_JOBS();

      expect(store.jobs).toEqual([
        {
          id: 1,
          title: "Vue Engineer",
        },
      ]);
    });
  });
});

describe("getters", () => {
  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);
  });

  describe("UNIQUE_ORGANIZATIONS", () => {
    it("finds unique organizations from list of jobs", () => {
      const store = useJobStore();
      store.jobs = [
        createJob({ organization: "Google" }),
        createJob({ organization: "Apple" }),
        createJob({ organization: "Google" }),
      ];

      expect(store.UNIQUE_ORGANIZATIONS).toEqual(new Set(["Google", "Apple"]));
    });
  });

  describe("UNIQUE_JOB_TYPES", () => {
    it("finds unique jobtypes from list of jobs", () => {
      const store = useJobStore();
      store.jobs = [
        createJob({ jobType: "Full-time" }),
        createJob({ jobType: "Part-time" }),
        createJob({ jobType: "Full-time" }),
      ];

      expect(store.UNIQUE_JOB_TYPES).toEqual(
        new Set(["Full-time", "Part-time"])
      );
    });
  });

  describe("INCLUDE_JOB_BY_ORGANIZATION", () => {
    describe("when the user has not selected any organization", () => {
      it("includes job", () => {
        const userStore = useUserStore();
        const jobStore = useJobStore();

        userStore.selectedOrganizations = [];

        const job = createJob({ organization: "Google" });

        const result = jobStore.INCLUDE_JOB_BY_ORGANIZATION(job);

        expect(result).toBe(true);
      });
    });

    describe("when the user has selected an organization", () => {
      describe("when the job organization is included in the selected organizations", () => {
        it("includes the job", () => {
          const userStore = useUserStore();
          const jobStore = useJobStore();

          userStore.selectedOrganizations = ["Google"];

          const job = createJob({ organization: "Google" });

          const result = jobStore.INCLUDE_JOB_BY_ORGANIZATION(job);

          expect(result).toBe(true);
        });
      });

      describe("when the job organization is NOT included in the selected organizations", () => {
        it("does not include the job", () => {
          const userStore = useUserStore();
          const jobStore = useJobStore();

          userStore.selectedOrganizations = ["Apple"];

          const job = createJob({ organization: "Google" });

          const result = jobStore.INCLUDE_JOB_BY_ORGANIZATION(job);

          expect(result).toBe(false);
        });
      });
    });
  });

  describe("INCLUDE_JOB_BY_JOB_TYPE", () => {
    describe("when the user has not selected any job type", () => {
      it("includes job", () => {
        const userStore = useUserStore();
        const jobStore = useJobStore();

        userStore.selectedJobTypes = [];

        const job = createJob({ jobType: "Full-time" });

        const result = jobStore.INCLUDE_JOB_BY_JOB_TYPE(job);

        expect(result).toBe(true);
      });
    });

    describe("when the user has selected a job type", () => {
      describe("when the job type is included in the selected job types", () => {
        it("includes the job", () => {
          const userStore = useUserStore();
          const jobStore = useJobStore();

          userStore.selectedJobTypes = ["Full-time"];

          const job = createJob({ jobType: "Full-time" });

          const result = jobStore.INCLUDE_JOB_BY_JOB_TYPE(job);

          expect(result).toBe(true);
        });
      });

      describe("when the job type is NOT included in the selected job types", () => {
        it("does not include the job", () => {
          const userStore = useUserStore();
          const jobStore = useJobStore();

          userStore.selectedJobTypes = ["Full-time"];

          const job = createJob({ jobType: "Part-time" });

          const result = jobStore.INCLUDE_JOB_BY_JOB_TYPE(job);

          expect(result).toBe(false);
        });
      });
    });
  });

  describe("INCLUDE_JOB_BY_DEGREE", () => {
    describe("when the user has not selected any degree", () => {
      it("includes job", () => {
        const userStore = useUserStore();
        const jobStore = useJobStore();

        userStore.selectedDegrees = [];

        const job = createJob();

        const result = jobStore.INCLUDE_JOB_BY_DEGREE(job);

        expect(result).toBe(true);
      });
    });

    describe("when the user has selected a degree", () => {
      describe("when the degree is included in the selected degrees", () => {
        it("includes the job", () => {
          const userStore = useUserStore();
          const jobStore = useJobStore();

          userStore.selectedDegrees = ["Master's"];

          const job = createJob({ degree: "Master's" });

          const result = jobStore.INCLUDE_JOB_BY_DEGREE(job);

          expect(result).toBe(true);
        });
      });

      describe("when the degree is NOT included in the selected degrees", () => {
        it("does not include the job", () => {
          const userStore = useUserStore();
          const jobStore = useJobStore();

          userStore.selectedDegrees = ["Master's"];

          const job = createJob({ degree: "Bachelor's" });

          const result = jobStore.INCLUDE_JOB_BY_DEGREE(job);

          expect(result).toBe(false);
        });
      });
    });
  });

  describe("INCLUDE_JOB_BY_SKILL", () => {
    it("identifies if job matches user's skill", () => {
      const userStore = useUserStore();
      const jobStore = useJobStore();

      userStore.skillsSearchTerm = "Vue";
      const job = createJob({ title: "Vue developer" });

      const result = jobStore.INCLUDE_JOB_BY_SKILL(job);

      expect(result).toBe(true);
    });

    it("handles inconsistent character casing", () => {
      const userStore = useUserStore();
      const jobStore = useJobStore();

      userStore.skillsSearchTerm = "vue";
      const job = createJob({ title: "Vue developer" });

      const result = jobStore.INCLUDE_JOB_BY_SKILL(job);

      expect(result).toBe(true);
    });

    describe("when the user has not entered any skill", () => {
      it("includes job", () => {
        const userStore = useUserStore();
        const jobStore = useJobStore();

        userStore.skillsSearchTerm = "";
        const job = createJob({ title: "Vue developer" });

        const result = jobStore.INCLUDE_JOB_BY_SKILL(job);

        expect(result).toBe(true);
      });
    });
  });
});
