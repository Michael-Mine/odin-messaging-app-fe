import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Chats from "./Chats";

describe("Chats component", () => {
  it("renders heading and new chat button", () => {
    render(<Chats chats={[]} />);

    const title = screen.getByRole("heading", { name: "Chats" });
    const newChatButton = screen.getByRole("button", { name: "New Chat" });

    expect(title).toBeInTheDocument();
    expect(newChatButton).toBeInTheDocument();
  });

  it("renders list of buttons for each chat", () => {
    render(
      <Chats
        chats={[
          {
            subject: "group",
          },
          {
            subject: "group2",
          },
          {
            subject: "group2",
          },
        ]}
      />,
    );

    expect(screen.getAllByRole("button").length).toEqual(4);
  });

  it("calls setCurrentChat on chat button click", async () => {
    const user = userEvent.setup();
    const setCurrentChat = vi.fn();
    render(
      <Chats
        chats={[
          {
            subject: "group",
          },
        ]}
        setCurrentChat={setCurrentChat}
      />,
    );

    const chatButton = screen.getByRole("button", { name: "group" });
    await user.click(chatButton);

    expect(setCurrentChat).toHaveBeenCalledWith({ subject: "group" });
  });

  it("opens New Chat component on button click", async () => {
    const user = userEvent.setup();
    render(<Chats chats={[]} />);

    const chatButton = screen.getByRole("button", { name: "New Chat" });
    await user.click(chatButton);

    const text = screen.getByText("Enter a Username:");
    expect(text).toBeInTheDocument();
  });
});
