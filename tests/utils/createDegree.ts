import type { Degree } from "@/api/types";

export const createDegree = (degreeObj: Partial<Degree> = {}): Degree => ({
  id: 1,
  degree: "Master's",
  ...degreeObj,
});
