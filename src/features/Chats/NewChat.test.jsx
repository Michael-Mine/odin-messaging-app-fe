import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewChat from "./NewChat";
import createChat from "./api/createChat";
import reloadPage from "../../utils/reloadPage";

vi.mock("./api/createChat");
vi.mock("../../utils/reloadPage");

describe("New Chat component", () => {
  it("Renders initial UI", () => {
    render(<NewChat />);

    const usernameLabel = screen.getByLabelText("Enter a Username:");
    const usernameInput = screen.getByTestId("name-input");
    const groupLabel = screen.getByLabelText("Group Chat?");
    const checkbox = screen.getByRole("checkbox");
    const button = screen.getByRole("button", { name: "Start New Chat" });

    expect(usernameLabel).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(groupLabel).toBeInTheDocument();
    expect(checkbox).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("Checking Group Chat? shows subject input", async () => {
    const user = userEvent.setup();
    render(<NewChat />);

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);

    const groupSubjectLabel = screen.getByLabelText(
      "Group Subject (required):",
    );
    const groupSubjectInput = screen.getByTestId("subject-input");

    expect(groupSubjectLabel).toBeInTheDocument();
    expect(groupSubjectInput).toBeInTheDocument();
  });

  it("username input value is updated correctly", async () => {
    const user = userEvent.setup();
    render(<NewChat />);

    const usernameInput = screen.getByTestId("name-input");
    await user.type(usernameInput, "Cool email");

    expect(usernameInput.value).toBe("Cool email");
  });

  it("group subject input value is updated correctly", async () => {
    const user = userEvent.setup();
    render(<NewChat />);

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);

    const groupSubjectInput = screen.getByTestId("subject-input");
    await user.type(groupSubjectInput, "Cool group");

    expect(groupSubjectInput.value).toBe("Cool group");
  });

  it("clicking submit calls createChat() correctly (not group)", async () => {
    const user = userEvent.setup();

    vi.mocked(createChat).mockResolvedValue({
      message: "New chat created",
    });

    localStorage.setItem("JWT", "token");
    localStorage.setItem("MMA", "Mine");
    render(<NewChat />);

    const usernameInput = screen.getByTestId("name-input");
    await user.type(usernameInput, "Josh");

    const button = screen.getByRole("button", { name: "Start New Chat" });
    await user.click(button);

    expect(createChat).toHaveBeenCalledWith({
      jwt: "token",
      username: "Mine",
      username2: "Josh",
      subject: null,
    });
  });

  it("clicking submit calls createChat() correctly (as group)", async () => {
    const user = userEvent.setup();

    vi.mocked(createChat).mockResolvedValue({
      message: "New chat created",
    });

    localStorage.setItem("JWT", "token");
    localStorage.setItem("MMA", "Mine");
    render(<NewChat />);

    const usernameInput = screen.getByTestId("name-input");
    await user.type(usernameInput, "Josh");

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);

    const groupSubjectInput = screen.getByTestId("subject-input");
    await user.type(groupSubjectInput, "Cool group");

    const button = screen.getByRole("button", { name: "Start New Chat" });
    await user.click(button);

    expect(createChat).toHaveBeenCalledWith({
      jwt: "token",
      username: "Mine",
      username2: "Josh",
      subject: "Cool group",
    });
  });

  it("shows success message", async () => {
    const user = userEvent.setup();

    vi.mocked(createChat).mockResolvedValue({
      message: "New chat created",
    });

    render(<NewChat />);

    const button = screen.getByRole("button", { name: "Start New Chat" });
    await user.click(button);

    const text = await screen.findByText("New chat created");
    expect(text).toBeInTheDocument();
  });

  it("Reloads after successful creation", async () => {
    const user = userEvent.setup();

    render(<NewChat />);

    const button = screen.getByRole("button", { name: "Start New Chat" });
    await user.click(button);

    expect(reloadPage).toHaveBeenCalled();
  });

  it("shows API validation errors 1/2", async () => {
    const user = userEvent.setup();

    vi.mocked(createChat).mockResolvedValue([
      {
        msg: "Username must be an email address",
      },
    ]);

    render(<NewChat />);

    const button = screen.getByRole("button", { name: "Start New Chat" });
    await user.click(button);

    const heading = screen.getByRole("heading", {
      name: "Username must be an email address",
    });
    expect(heading).toBeInTheDocument();
  });

  it("shows API validation errors 2/2", async () => {
    const user = userEvent.setup();

    vi.mocked(createChat).mockResolvedValue({
      message: "User not found",
    });

    render(<NewChat />);

    const button = screen.getByRole("button", { name: "Start New Chat" });
    await user.click(button);

    const heading = screen.getByRole("heading", {
      name: "User not found",
    });
    expect(heading).toBeInTheDocument();
  });

  it("shows network error", async () => {
    const user = userEvent.setup();

    vi.mocked(createChat).mockRejectedValue(new Error("network"));

    render(<NewChat />);

    const button = screen.getByRole("button", { name: "Start New Chat" });
    await user.click(button);

    const heading = screen.getByRole("heading", {
      name: "A network error was encountered",
    });
    expect(heading).toBeInTheDocument();
  });

  it("shows and hides submitting indicator", async () => {
    const user = userEvent.setup();
    let resolvePromise;

    vi.mocked(createChat).mockReturnValue(
      new Promise((resolve) => {
        resolvePromise = resolve;
      }),
    );
    render(<NewChat />);

    const button = screen.getByRole("button", { name: "Start New Chat" });
    await user.click(button);

    const heading = screen.getByRole("heading", {
      name: "Submitting...",
    });
    expect(heading).toBeInTheDocument();

    resolvePromise({
      message: "New chat created",
    });

    await waitFor(() => expect(heading).not.toBeInTheDocument());
  });
});
