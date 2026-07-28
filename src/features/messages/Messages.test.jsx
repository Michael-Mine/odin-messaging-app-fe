import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Messages from "./Messages";

vi.mock("./MessagesList");
vi.mock("./MessagesHeader");

describe("Messages composition component", () => {
  it("renders WriteMessage when there are multiple users in chat", () => {
    render(
      <Messages
        chat={{
          users: [{}, {}],
        }}
      />,
    );

    const input = screen.getByTestId("write-message");
    expect(input).toBeInTheDocument();
  });

  it("renders text when there are open user in chat", () => {
    render(
      <Messages
        chat={{
          users: [{}],
        }}
      />,
    );

    const title = screen.getByRole("heading", {
      name: "No other user in chat",
    });
    expect(title).toBeInTheDocument();
  });
});
