import usePreviousAndNextPages from "@/composables/usePreviousAndNextPages";
import { ref } from "vue";

describe("usePreviousAndNextPages", () => {
  it("calculates page before current page", () => {
    const currentPage = ref(5);
    const lastPage = ref(9);

    const { previousPage } = usePreviousAndNextPages(currentPage, lastPage);
    expect(previousPage.value).toBe(4);
  });

  describe("when current page is the first page", () => {
    it("does not provide previous page", () => {
      const currentPage = ref(1);
      const lastPage = ref(9);

      const { previousPage } = usePreviousAndNextPages(currentPage, lastPage);
      expect(previousPage.value).toBeUndefined();
    });
  });

  it("calculates page after current page", () => {
    const currentPage = ref(5);
    const lastPage = ref(9);

    const { nextPage } = usePreviousAndNextPages(currentPage, lastPage);
    expect(nextPage.value).toBe(6);
  });

  describe("when current page is the last page", () => {
    it("does not provide next page", () => {
      const currentPage = ref(9);
      const lastPage = ref(9);

      const { nextPage } = usePreviousAndNextPages(currentPage, lastPage);
      expect(nextPage.value).toBeUndefined();
    });
  });
});
