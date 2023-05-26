import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import JobSearchForm from "@/components/JobSearch/JobSearchForm.vue";
import { type Mock, vi } from "vitest";
import { useRouter } from "vue-router";

vi.mock("vue-router");

const useRouterMock = useRouter as Mock;

describe("JobSearchForm", () => {
  describe("when user submits form", () => {
    it("directs user to jobresults page with search parameters", async () => {
      const push = vi.fn();
      useRouterMock.mockReturnValue({ push });

      render(JobSearchForm, {
        global: {
          stubs: {
            FontAwesomeIcon: true,
          },
        },
      });

      const roleInput = screen.getByRole("textbox", {
        name: /role/i,
      });
      const role = "DevOps Engineer";
      await userEvent.type(roleInput, role);

      const locationInput = screen.getByRole("textbox", {
        name: /where?/i,
      });
      const location = "Rotterdam";
      await userEvent.type(locationInput, location);

      const submitButton = screen.getByRole("button", {
        name: /search/i,
      });
      await userEvent.click(submitButton);

      expect(push).toBeCalledWith({
        name: "JobResults",
        query: { role, location },
      });
    });
  });
});
