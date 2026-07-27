import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import MessagesList from "./MessagesList";
import MessagesListItem from "./MessagesListItem";
import shouldShowDivider from "./shouldShowDivider";

vi.mock("./MessagesListItem");
vi.mock("./shouldShowDivider");

describe("Message List", () => {
  it("renders every message", () => {
    vi.mocked(MessagesListItem).mockReturnValue(
      <div data-testid="message-item"></div>,
    );
    render(
      <MessagesList
        messages={[
          {
            content: "How was J2",
          },
          {
            content: "Good at start and end",
          },
          {
            content: "nice",
          },
        ]}
      />,
    );
    const container = screen.getAllByTestId("message-item");
    expect(container).toHaveLength(3);
  });

  it("renders a divider when shouldShowDivider returns true", () => {
    vi.mocked(shouldShowDivider).mockReturnValue(true);

    render(
      <MessagesList
        messages={[
          {
            content: "How was J2",
            createdAt: "2026-07-27T13:45:00Z",
          },
          {
            content: "Good at start and end",
            createdAt: "2026-07-28T13:45:00Z",
          },
          {
            content: "nice",
            createdAt: "2026-07-29T13:45:00Z",
          },
        ]}
      />,
    );
    const container = screen.getAllByText(/Mon|Tue|Wed|Thu|Fri|Sat|Sun/);
    expect(container).toHaveLength(3);
  });

  it("doesn't render a divider when shouldShowDivider returns false", () => {
    vi.mocked(shouldShowDivider).mockReturnValue(false);

    render(
      <MessagesList
        messages={[
          {
            content: "How was J2",
            createdAt: "2026-07-27T13:45:00Z",
          },
          {
            content: "Good at start and end",
            createdAt: "2026-07-28T13:45:00Z",
          },
          {
            content: "nice",
            createdAt: "2026-07-29T13:45:00Z",
          },
        ]}
      />,
    );
    const container = screen.queryAllByText(/Mon|Tue|Wed|Thu|Fri|Sat|Sun/);
    expect(container).toHaveLength(0);
  });

  it("Scrolls to the bottom when messages change", () => {
    const { rerender, container } = render(
      <MessagesList
        messages={[
          {
            content: "How was J2",
            createdAt: "2026-07-27T13:45:00Z",
          },
          {
            content: "Good at start and end",
            createdAt: "2026-07-28T13:45:00Z",
          },
          {
            content: "nice",
            createdAt: "2026-07-29T13:45:00Z",
          },
        ]}
        isGroupChat={false}
      />,
    );

    const list = container.firstChild;

    Object.defineProperty(list, "scrollHeight", {
      value: 500,
    });

    Object.defineProperty(list, "scrollTop", {
      writable: true,
      value: 0,
    });

    rerender(
      <MessagesList
        messages={[
          {
            content: "How was J2",
            createdAt: "2026-07-27T13:45:00Z",
          },
          {
            content: "Good at start and end",
            createdAt: "2026-07-28T13:45:00Z",
          },
          {
            content: "nice",
            createdAt: "2026-07-29T13:45:00Z",
          },
          {
            content: "nice",
            createdAt: "2026-07-29T13:45:00Z",
          },
        ]}
        isGroupChat={false}
      />,
    );

    expect(list.scrollTop).toBe(500);
  });

  it("empty messages shouldn't crash", () => {
    vi.mocked(MessagesListItem).mockReturnValue(
      <div data-testid="message-item"></div>,
    );

    render(<MessagesList messages={[]} />);
    const container = screen.queryByTestId("message-item");
    expect(container).not.toBeInTheDocument();
  });
});
