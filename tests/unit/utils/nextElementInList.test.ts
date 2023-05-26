import nextElementInList from "@/utils/nextElementInList";

describe("nextElementInList", () => {
  it("finds element in list and returns the next element", () => {
    const list = ["A", "B", "C", "D", "E"];
    const currentElement = "C";
    const nextElement = nextElementInList(currentElement, list);
    expect(nextElement).toBe("D");
  });

  describe("when element is at the end of the list", () => {
    it("finds element in list and returns the first element", () => {
      const list = ["A", "B", "C", "D", "E"];
      const currentElement = "E";
      const nextElement = nextElementInList(currentElement, list);
      expect(nextElement).toBe("A");
    });
  });
});
