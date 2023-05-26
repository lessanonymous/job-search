import { render, screen } from "@testing-library/vue";
import JobListing from "@/components/JobResults/JobListing.vue";
import { RouterLinkStub } from "@vue/test-utils";
import type { Job } from "@/api/types";
import { createJob } from "tests/utils/createJob";

describe("JobListing", () => {
  const renderJobListing = (job: Job) => {
    render(JobListing, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
      props: {
        job: {
          ...job,
        },
      },
    });
  };

  it("displays job title", () => {
    const job = createJob({ title: "Vue Developer" });
    renderJobListing(job);
    expect(screen.getByText("Vue Developer")).toBeInTheDocument();
  });

  it("displays organization", () => {
    const job = createJob({ organization: "AirBnb" });
    renderJobListing(job);
    expect(screen.getByText("AirBnb")).toBeInTheDocument();
  });

  it("renders job locations", () => {
    const job = createJob({ locations: ["Amsterdam", "Den Haag"] });
    renderJobListing(job);
    expect(screen.getByText("Amsterdam")).toBeInTheDocument();
    expect(screen.getByText("Den Haag")).toBeInTheDocument();
  });

  it("renders job qualifications", () => {
    const job = createJob({ minimumQualifications: ["Vue", "Git"] });
    renderJobListing(job);
    expect(screen.getByText("Vue")).toBeInTheDocument();
    expect(screen.getByText("Git")).toBeInTheDocument();
  });
});
