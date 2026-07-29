import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddMember from "./AddMember";
import updateChat from "./api/updateChat";
import reloadPage from "../../utils/reloadPage";

vi.mock("./api/updateChat");
vi.mock("../../utils/reloadPage");

describe("Add Member component", () => {
  it("renders text, input & button", () => {
    render(<AddMember />);
    const { container } = render(<AddMember />);

    expect(container).toMatchSnapshot();
  });

  it("input value is updated correctly", async () => {
    const user = userEvent.setup();

    render(<AddMember />);

    const nameInput = screen.getByTestId("name-input");

    await user.type(nameInput, "Josh");

    expect(nameInput.value).toBe("Josh");
  });

  it("clicking submit calls updateChat() correctly", async () => {
    const user = userEvent.setup();

    vi.mocked(updateChat).mockResolvedValue({
      message: "New member added",
    });

    localStorage.setItem("JWT", "token");
    localStorage.setItem("MMA", "M");

    render(<AddMember chatCuid={1} />);

    const nameInput = screen.getByTestId("name-input");
    await user.type(nameInput, "Josh");

    const button = screen.getByRole("button", { name: "Submit" });
    await user.click(button);

    expect(updateChat).toHaveBeenCalledWith({
      jwt: "token",
      username: "M",
      username2: "Josh",
      chatCuid: 1,
    });
  });

  it("shows and hides submitting indicator", async () => {
    const user = userEvent.setup();

    let resolvePromise;

    vi.mocked(updateChat).mockReturnValue(
      new Promise((resolve) => {
        resolvePromise = resolve;
      }),
    );

    render(<AddMember />);

    const button = screen.getByRole("button", { name: "Submit" });
    await user.click(button);

    const heading = screen.getByRole("heading", {
      name: "Submitting...",
    });
    expect(heading).toBeInTheDocument();

    resolvePromise({
      message: "New member added",
    });

    await waitFor(() => expect(heading).not.toBeInTheDocument());
  });

  it("shows success message", async () => {
    const user = userEvent.setup();

    vi.mocked(updateChat).mockResolvedValue({
      message: "New member added",
    });

    render(<AddMember />);

    const button = screen.getByRole("button", { name: "Submit" });
    await user.click(button);

    const text = await screen.findByText("New member added");
    expect(text).toBeInTheDocument();
  });

  it("Reloads after success", async () => {
    const user = userEvent.setup();

    render(<AddMember />);

    const button = screen.getByRole("button", { name: "Submit" });
    await user.click(button);

    expect(reloadPage).toHaveBeenCalled();
  });

  it("shows network error", async () => {
    const user = userEvent.setup();

    vi.mocked(updateChat).mockRejectedValue(new Error("network"));

    render(<AddMember />);

    const button = screen.getByRole("button", { name: "Submit" });
    await user.click(button);

    const heading = screen.getByRole("heading", {
      name: "A network error was encountered",
    });
    expect(heading).toBeInTheDocument();
  });

  it("shows API validation errors 1/2", async () => {
    const user = userEvent.setup();

    vi.mocked(updateChat).mockResolvedValue([
      {
        msg: "Username must be an email address",
      },
    ]);

    render(<AddMember />);

    const button = screen.getByRole("button", { name: "Submit" });
    await user.click(button);

    const heading = screen.getByRole("heading", {
      name: "Username must be an email address",
    });
    expect(heading).toBeInTheDocument();
  });

  it("shows API validation errors 2/2", async () => {
    const user = userEvent.setup();

    vi.mocked(updateChat).mockResolvedValue({
      message: "User not found",
    });

    render(<AddMember />);

    const button = screen.getByRole("button", { name: "Submit" });
    await user.click(button);

    const heading = screen.getByRole("heading", {
      name: "User not found",
    });
    expect(heading).toBeInTheDocument();
  });
});
