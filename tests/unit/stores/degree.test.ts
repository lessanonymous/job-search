import { createPinia, setActivePinia } from "pinia";
import { useDegreeStore } from "@/stores/degree";
import axios from "axios";
import { vi } from "vitest";
import type { Mock } from "vitest";
import type { Degree } from "@/api/types";
import { createDegree } from "tests/utils/createDegree";

vi.mock("axios");

const axiosGetMock = axios.get as Mock;

describe("state", () => {
  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);
  });

  it("stores degrees", () => {
    const store = useDegreeStore();

    expect(store.degrees).toEqual([]);
  });
});

describe("actions", () => {
  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);
  });

  describe("SET_DEGREES", () => {
    it("makes api request and stores received degrees", async () => {
      axiosGetMock.mockResolvedValue({
        data: [
          {
            id: 1,
            degree: "Master's",
          },
        ],
      });

      const store = useDegreeStore();
      await store.SET_DEGREES();

      expect(store.degrees).toEqual([
        {
          id: 1,
          degree: "Master's",
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

  describe("UNIQUE_DEGREES", () => {
    it("finds unique degrees from collection of degrees", () => {
      const store = useDegreeStore();
      store.degrees = [
        createDegree({ degree: "Master's" }),
        createDegree({ degree: "Bachelor's" }),
      ];

      expect(store.UNIQUE_DEGREES).toEqual(["Master's", "Bachelor's"]);
    });
  });
});
