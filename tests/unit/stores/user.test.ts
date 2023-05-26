import { useUserStore } from "@/stores/user";
import { createPinia, setActivePinia } from "pinia";

describe("state", () => {
  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);
  });

  it("keeps track of user login state", () => {
    const store = useUserStore();

    expect(store.isLoggedIn).toBe(false);
  });

  it("keeps track of selected organizations for this user", () => {
    const store = useUserStore();

    expect(store.selectedOrganizations).toEqual([]);
  });

  it("keeps track of selected jobtypes for this user", () => {
    const store = useUserStore();

    expect(store.selectedJobTypes).toEqual([]);
  });

  it("keeps track of selected degrees for this user", () => {
    const store = useUserStore();

    expect(store.selectedDegrees).toEqual([]);
  });

  it("keeps track of search term for skills and qualifications", () => {
    const store = useUserStore();

    expect(store.skillsSearchTerm).toBe("");
  });
});

describe("actions", () => {
  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);
  });

  describe("LOGIN_USER", () => {
    it("login user", () => {
      const store = useUserStore();
      store.LOGIN_USER();
      expect(store.isLoggedIn).toBe(true);
    });
  });

  describe("ADD_SELECTED_ORGANIZATIONS", () => {
    it("updates the organizations the user has chosen", () => {
      const store = useUserStore();

      const selectedOrganizations = ["Google", "Apple", "Amazon"];
      store.ADD_SELECTED_ORGANIZATIONS(selectedOrganizations);

      expect(store.selectedOrganizations).toEqual([
        "Google",
        "Apple",
        "Amazon",
      ]);
    });
  });

  describe("ADD_SELECTED_JOB_TYPES", () => {
    it("updates jobtypes the user has chosen", () => {
      const store = useUserStore();

      const selectedJobTypes = ["Full-time", "Part-time"];
      store.ADD_SELECTED_JOB_TYPES(selectedJobTypes);

      expect(store.selectedJobTypes).toEqual(["Full-time", "Part-time"]);
    });
  });

  describe("ADD_SELECTED_DEGREES", () => {
    it("updates degrees the user has chosen", () => {
      const store = useUserStore();

      const selectedDegrees = ["Master's", "Bachelor's"];
      store.ADD_SELECTED_DEGREES(selectedDegrees);

      expect(store.selectedDegrees).toEqual(["Master's", "Bachelor's"]);
    });
  });

  describe("UPDATE_SKILLS_SEARCH_TERM", () => {
    it("updates the skills search term to the one the user has entered", () => {
      const store = useUserStore();

      store.skillsSearchTerm = "";
      store.UPDATE_SKILLS_SEARCH_TERM("Vue");

      expect(store.skillsSearchTerm).toBe("Vue");
    });
  });

  describe("CLEAR_USER_JOB_FILTER_SELECTIONS", () => {
    it("removes all job filters that user has chosen", () => {
      const store = useUserStore();

      store.selectedDegrees = ["Random degree"];
      store.selectedJobTypes = ["Random job type"];
      store.selectedOrganizations = ["Random organization"];
      store.skillsSearchTerm = "Vue developer";

      store.CLEAR_USER_JOB_FILTER_SELECTIONS();

      expect(store.selectedDegrees).toEqual([]);
      expect(store.selectedJobTypes).toEqual([]);
      expect(store.selectedOrganizations).toEqual([]);
      expect(store.skillsSearchTerm).toBe("");
    });
  });
});
