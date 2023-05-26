import { render, screen } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";
import MainNav from "@/components/Navigation/MainNav.vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";
import { useUserStore } from "@/stores/user";
import { useRoute } from "vue-router";
import { type Mock, vi } from "vitest";

vi.mock("vue-router");

const useRouteMock = useRoute as Mock;

describe("MainNav", () => {
  const renderMainNav = () => {
    useRouteMock.mockReturnValue({ name: "JobResults" });
    const pinia = createTestingPinia();

    render(MainNav, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
          RouterLink: RouterLinkStub,
        },
      },
    });
  };
  it("displays company name", () => {
    renderMainNav();

    const companyName = screen.getByText("Juju Careers");
    expect(companyName).toBeInTheDocument();
  });

  it("displays menu items for navigation", () => {
    renderMainNav();

    const listItems = screen.getAllByRole("listitem");
    const listItemsText = listItems.map((item) => item.textContent);
    expect(listItemsText).toEqual([
      "Teams",
      "Locations",
      "Life at Juju Careers",
      "How we hire",
      "Students",
      "Jobs",
    ]);
  });

  describe("when the user logs in", () => {
    it("displays the profile image", async () => {
      renderMainNav();
      const userStore = useUserStore();

      let avatarImage = screen.queryByRole("img", {
        name: /avatar/i,
      });
      expect(avatarImage).not.toBeInTheDocument();

      const loginButton = screen.getByRole("button", {
        name: /sign in/i,
      });
      userStore.isLoggedIn = true;
      await userEvent.click(loginButton);

      avatarImage = screen.getByRole("img", {
        name: /avatar/i,
      });
      expect(avatarImage).toBeInTheDocument();
    });
  });
});
