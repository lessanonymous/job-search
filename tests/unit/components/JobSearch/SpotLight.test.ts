import { render, screen } from "@testing-library/vue";
import SpotLight from "@/components/JobSearch/SpotLight.vue";
import axios from "axios";
import { vi, type Mock } from "vitest";

vi.mock("axios");

const axiosGetMock = axios.get as Mock;

describe("SpotLight", () => {
  const mockSpotlightsResponse = (spotlight = {}) => {
    axiosGetMock.mockResolvedValue({
      data: [
        {
          id: 1,
          img: "some image",
          title: "some title",
          description: "some description",
          ...spotlight,
        },
      ],
    });
  };

  it("provides image to parent component", async () => {
    const spotlight = {
      img: "some image",
    };

    mockSpotlightsResponse(spotlight);

    render(SpotLight, {
      slots: {
        default: `
        <template #default="slotProps">
          <h1>{{ slotProps.img }}</h1>
        </template>
        `,
      },
    });

    const imageUrl = await screen.findByText(/some image/i);

    expect(imageUrl).toBeInTheDocument();
  });

  it("provides title to parent component", async () => {
    const spotlight = {
      title: "some title",
    };

    mockSpotlightsResponse(spotlight);

    render(SpotLight, {
      slots: {
        default: `
        <template #default="slotProps">
          <h1>{{ slotProps.title }}</h1>
        </template>
        `,
      },
    });

    const title = await screen.findByText(/some title/i);

    expect(title).toBeInTheDocument();
  });

  it("provides description to parent component", async () => {
    const spotlight = {
      description: "some description",
    };

    mockSpotlightsResponse(spotlight);

    render(SpotLight, {
      slots: {
        default: `
        <template #default="slotProps">
          <h1>{{ slotProps.description }}</h1>
        </template>
        `,
      },
    });

    const description = await screen.findByText(/some description/i);

    expect(description).toBeInTheDocument();
  });
});
