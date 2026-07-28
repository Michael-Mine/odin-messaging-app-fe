import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WriteMessage from "./WriteMessage";
import createMessage from "./api/createMessage";
import reloadPage from "../../utils/reloadPage";

vi.mock("./api/createMessage");
vi.mock("../../utils/reloadPage");

describe("Write message component", () => {
  it("renders input and button", () => {
    render(<WriteMessage />);
    const { container } = render(<WriteMessage />);

    expect(container).toMatchSnapshot();
  });

  it("message input value is updated correctly", async () => {
    const user = userEvent.setup();
    render(<WriteMessage />);

    const input = screen.getByTestId("write-message");
    await user.type(input, "Cool email");

    expect(input.value).toBe("Cool email");
  });

  it("clicking submit calls createMessage() correctly", async () => {
    const user = userEvent.setup();

    vi.mocked(createMessage).mockResolvedValue({
      message: "New message created",
    });

    localStorage.setItem("JWT", "token");
    localStorage.setItem("MMA", "Mine");
    render(<WriteMessage chatCuid={1} />);

    const input = screen.getByTestId("write-message");
    await user.type(input, "Cool email");

    const button = screen.getByRole("button", { name: "Send" });
    await user.click(button);

    expect(createMessage).toHaveBeenCalledWith({
      jwt: "token",
      username: "Mine",
      chatCuid: 1,
      content: "Cool email",
    });
  });

  it("shows and hides submitting indicator", async () => {
    const user = userEvent.setup();

    let resolvePromise;

    vi.mocked(createMessage).mockReturnValue(
      new Promise((resolve) => {
        resolvePromise = resolve;
      }),
    );

    render(<WriteMessage chatCuid={1} />);

    const input = screen.getByTestId("write-message");
    await user.type(input, "Cool email");

    const button = screen.getByRole("button", { name: "Send" });
    await user.click(button);

    const heading = screen.getByRole("heading", {
      name: "Submitting...",
    });
    expect(heading).toBeInTheDocument();

    resolvePromise({
      message: "New message created",
    });

    await waitFor(() => expect(heading).not.toBeInTheDocument());
  });

  it("shows success message", async () => {
    const user = userEvent.setup();

    vi.mocked(createMessage).mockResolvedValue({
      message: "New message created",
    });

    render(<WriteMessage chatCuid={1} />);

    const input = screen.getByTestId("write-message");
    await user.type(input, "Cool email");

    const button = screen.getByRole("button", { name: "Send" });
    await user.click(button);

    const text = await screen.findByText("New message created");
    expect(text).toBeInTheDocument();
  });

  it("Reloads after success", async () => {
    const user = userEvent.setup();

    render(<WriteMessage chatCuid={1} />);

    const input = screen.getByTestId("write-message");
    await user.type(input, "Cool email");

    const button = screen.getByRole("button", { name: "Send" });
    await user.click(button);

    expect(reloadPage).toHaveBeenCalled();
  });

  it("shows network error", async () => {
    const user = userEvent.setup();

    vi.mocked(createMessage).mockRejectedValue(new Error("network"));

    render(<WriteMessage chatCuid={1} />);

    const input = screen.getByTestId("write-message");
    await user.type(input, "Cool email");

    const button = screen.getByRole("button", { name: "Send" });
    await user.click(button);

    const heading = screen.getByRole("heading", {
      name: "A network error was encountered",
    });
    expect(heading).toBeInTheDocument();
  });

  it("shows API validation errors 1/2", async () => {
    const user = userEvent.setup();

    vi.mocked(createMessage).mockResolvedValue([
      {
        msg: "Username must be an email address",
      },
    ]);

    render(<WriteMessage chatCuid={1} />);

    const input = screen.getByTestId("write-message");
    await user.type(input, "Cool email");

    const button = screen.getByRole("button", { name: "Send" });
    await user.click(button);

    const heading = screen.getByRole("heading", {
      name: "Username must be an email address",
    });
    expect(heading).toBeInTheDocument();
  });

  it("shows API validation errors 2/2", async () => {
    const user = userEvent.setup();

    vi.mocked(createMessage).mockResolvedValue({
      message: "User not found",
    });

    render(<WriteMessage chatCuid={1} />);

    const input = screen.getByTestId("write-message");
    await user.type(input, "Cool email");

    const button = screen.getByRole("button", { name: "Send" });
    await user.click(button);

    const heading = screen.getByRole("heading", {
      name: "User not found",
    });
    expect(heading).toBeInTheDocument();
  });
});
