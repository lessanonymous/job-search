import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import TextInput from "@/components/Shared/TextInput.vue";

describe("TextInput", () => {
  it("communicates that user has entered character", async () => {
    const { emitted } = render(TextInput, {
      props: {
        modelValue: "",
      },
    });

    const input = screen.getByRole("textbox");
    await userEvent.type(input, "Test");

    expect(emitted()["update:modelValue"]).toEqual([
      ["T"],
      ["Te"],
      ["Tes"],
      ["Test"],
    ]);
  });
});