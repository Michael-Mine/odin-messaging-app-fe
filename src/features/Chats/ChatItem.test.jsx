import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChatItem from "./ChatItem";

describe("ChatItem component", () => {
  it("renders group chat subject as button name", () => {
    render(<ChatItem chat={{ subject: "group2" }} />);

    const button = screen.getByRole("button", { name: "group2" });
    expect(button).toBeInTheDocument();
  });

  it("renders other user left subject as button name", () => {
    render(<ChatItem chat={{ users: [1] }} />);

    const button = screen.getByRole("button", { name: "Other user left" });
    expect(button).toBeInTheDocument();
  });

  it("renders other username as button name", () => {
    localStorage.setItem("MMA", "mr@mine.net");

    render(
      <ChatItem
        chat={{ users: [{ username: "m@m.net", name: "Mine2" }, {}] }}
      />,
    );

    const button = screen.getByRole("button", { name: "Mine2" });
    expect(button).toBeInTheDocument();
  });

  it("calls openMessages on chat button click", async () => {
    const user = userEvent.setup();
    const openMessages = vi.fn();
    render(
      <ChatItem
        chat={{ subject: "group2", cuid: 123 }}
        openMessages={openMessages}
      />,
    );

    const button = screen.getByRole("button", { name: "group2" });
    await user.click(button);

    expect(openMessages).toHaveBeenCalledWith(123);
  });
});
