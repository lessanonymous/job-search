import { screen, render } from "@testing-library/vue";
import HeaderContainer from "@/components/Shared/HeaderContainer.vue";

describe("HeaderContainer", () => {
  const renderHeaderContainer = (slots = {}) => {
    render(HeaderContainer, {
      slots: {
        title: "<h1>My Title</h1>",
        ...slots,
      },
    });
  };

  it("allows parent component to render title content", () => {
    const slots = {
      title: "<h1>My Title</h1>",
    };

    renderHeaderContainer(slots);

    const title = screen.getByRole("heading", {
      name: /my title/i,
    });

    expect(title).toBeInTheDocument();
  });

  it("allows parent component to render subtitle content", () => {
    const slots = {
      subtitle: "<h2>My Subtitle</h2>",
    };

    renderHeaderContainer(slots);

    const subtitle = screen.getByRole("heading", {
      name: /my subtitle/i,
    });

    expect(subtitle).toBeInTheDocument();
  });
});
