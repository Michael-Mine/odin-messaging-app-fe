import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MessagesListItem from "./MessagesListItem";
import styles from "./MessagesListItem.module.css";

describe("Messages List Item component", () => {
  it("renders the message content", () => {
    render(
      <MessagesListItem
        message={{
          content: "How was J2",
          sender: { username: "Josh" },
        }}
      />,
    );

    const text = screen.getByText("How was J2");
    expect(text).toBeInTheDocument();
  });

  it("displays the formatted time", () => {
    render(
      <MessagesListItem
        message={{
          content: "How was J2",
          sender: { username: "Josh" },
          createdAt: "2026-07-27T13:45:00Z",
        }}
      />,
    );

    const text = screen.getByText("14:45");
    expect(text).toBeInTheDocument();
  });

  it("Uses the 'user' container css class when sender is user", () => {
    localStorage.setItem("MMA", "Mine");

    render(
      <MessagesListItem
        message={{
          content: "How was J2",
          sender: { username: "Mine" },
          createdAt: "2026-07-27T13:45:00Z",
        }}
      />,
    );

    const container = screen.getByTestId("message-container");
    expect(container).toHaveClass(styles.userContainer);
  });

  it("Uses the 'other' container css class when sender is user", () => {
    localStorage.setItem("MMA", "Mine");

    render(
      <MessagesListItem
        message={{
          content: "How was J2",
          sender: { username: "Josh" },
          createdAt: "2026-07-27T13:45:00Z",
        }}
      />,
    );

    const container = screen.getByTestId("message-container");
    expect(container).toHaveClass(styles.otherContainer);
  });

  it("Shows other user name in group chat", () => {
    localStorage.setItem("MMA", "Mine");

    render(
      <MessagesListItem
        message={{
          content: "How was J2",
          sender: { username: "Josh", name: "Josh Dubai" },
          createdAt: "2026-07-27T13:45:00Z",
        }}
        isGroupChat={true}
      />,
    );

    const text = screen.getByText("Josh Dubai");
    expect(text).toBeInTheDocument();
  });

  it("Doesn't show other user name in 1-2-1 chat", () => {
    localStorage.setItem("MMA", "Mine");

    render(
      <MessagesListItem
        message={{
          content: "How was J2",
          sender: { username: "Josh", name: "Josh Dubai" },
          createdAt: "2026-07-27T13:45:00Z",
        }}
        isGroupChat={false}
      />,
    );

    const text = screen.queryByText("Josh Dubai");
    expect(text).not.toBeInTheDocument();
  });
});
