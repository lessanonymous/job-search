import axios from "axios";
import { vi } from "vitest";
import type { Mock } from "vitest";
import getJobs from "@/api/getJobs";
vi.mock("axios");

const axiosGetMock = axios.get as Mock;

describe("getJobs", () => {
  beforeEach(() => {
    axiosGetMock.mockResolvedValue({
      data: [
        {
          id: 1,
          title: "Vue Engineer",
        },
      ],
    });
  });

  it("fetches jobs", async () => {
    await getJobs();
    expect(axios.get).toBeCalledWith(
      `${import.meta.env.VITE_APP_API_URL}/jobs`
    );
  });

  it("extracts jobs from response", async () => {
    const jobs = await getJobs();
    expect(jobs).toEqual([
      {
        id: 1,
        title: "Vue Engineer",
      },
    ]);
  });
});
