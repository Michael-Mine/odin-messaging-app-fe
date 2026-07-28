import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MessagesHeader from "./MessagesHeader";
import getHeading from "./getHeading";
import deleteChat from "./api/deleteChat";
import reloadPage from "../../utils/reloadPage";

vi.mock("./getHeading");
vi.mock("./api/deleteChat");
vi.mock("../../utils/reloadPage");

describe("Messages Header component", () => {
  it("renders direct chat UI", () => {
    const chat = {
      users: [
        { username: "J", name: "Josh" },
        { username: "M", name: "Mine" },
      ],
    };

    render(<MessagesHeader chat={chat} isGroupChat={false} />);

    const profileButton = screen.getByRole("button", { name: "Profile" });
    const leaveChatButton = screen.getByRole("button", { name: "Leave Chat" });
    const groupInfoButton = screen.queryByRole("button", {
      name: "Group Info",
    });

    expect(profileButton).toBeInTheDocument();
    expect(leaveChatButton).toBeInTheDocument();
    expect(groupInfoButton).not.toBeInTheDocument();
  });

  it("renders group chat UI", () => {
    const chat = {
      subject: "group chat",
      users: [
        { username: "J", name: "Josh" },
        { username: "M", name: "Mine" },
      ],
    };

    render(<MessagesHeader chat={chat} isGroupChat={true} />);

    const profileButton = screen.queryByRole("button", { name: "Profile" });
    const leaveChatButton = screen.getByRole("button", { name: "Leave Group" });
    const groupInfoButton = screen.getByRole("button", {
      name: "Group Info",
    });

    expect(profileButton).not.toBeInTheDocument();
    expect(leaveChatButton).toBeInTheDocument();
    expect(groupInfoButton).toBeInTheDocument();
  });

  it("doesn't render Profile button when one user in direct chat", () => {
    const chat = {
      users: [{ username: "M", name: "Mine" }],
    };

    render(<MessagesHeader chat={chat} isGroupChat={false} />);

    const profileButton = screen.queryByRole("button", { name: "Profile" });

    expect(profileButton).not.toBeInTheDocument();
  });

  it("displays heading returned bu getHeading()", () => {
    vi.mocked(getHeading).mockReturnValue("Josh");

    const chat = {
      users: [{}, {}],
    };

    render(<MessagesHeader chat={chat} isGroupChat={false} />);

    const title = screen.getByRole("heading", { name: "Josh" });

    expect(title).toBeInTheDocument();
  });

  it("clicking Profile makes correct calls", async () => {
    const user = userEvent.setup();
    const getProfileUser = vi.fn();
    const setSideCompOpen = vi.fn();

    const chat = {
      users: [
        { username: "J", name: "Josh" },
        { username: "M", name: "Mine" },
      ],
    };

    render(
      <MessagesHeader
        chat={chat}
        isGroupChat={false}
        setSideCompOpen={setSideCompOpen}
        getProfileUser={getProfileUser}
      />,
    );

    const profileButton = screen.getByRole("button", { name: "Profile" });
    await user.click(profileButton);

    expect(getProfileUser).toHaveBeenCalledWith("J");
    expect(setSideCompOpen).toHaveBeenCalledWith("profile");
  });

  it("clicking Group Info makes correct calls", async () => {
    const user = userEvent.setup();
    const getGroupInfoChat = vi.fn();
    const setSideCompOpen = vi.fn();

    const chat = {
      subject: "group chat",
      users: [
        { username: "J", name: "Josh" },
        { username: "M", name: "Mine" },
      ],
    };

    render(
      <MessagesHeader
        chat={chat}
        isGroupChat={true}
        setSideCompOpen={setSideCompOpen}
        getGroupInfoChat={getGroupInfoChat}
      />,
    );

    const groupInfoButton = screen.getByRole("button", { name: "Group Info" });
    await user.click(groupInfoButton);

    expect(getGroupInfoChat).toHaveBeenCalledWith("group chat");
    expect(setSideCompOpen).toHaveBeenCalledWith("group");
  });

  it("clicking Leave Chat makes correct calls", async () => {
    const user = userEvent.setup();

    const chat = {
      cuid: 1,
      users: [{}, {}],
    };

    vi.mocked(deleteChat).mockResolvedValue({
      message: "User left chat",
    });

    localStorage.setItem("JWT", "token");
    localStorage.setItem("MMA", "Mine");

    render(<MessagesHeader chat={chat} isGroupChat={false} />);

    const leaveChatButton = screen.getByRole("button", { name: "Leave Chat" });
    await user.click(leaveChatButton);

    expect(deleteChat).toHaveBeenCalledWith({
      jwt: "token",
      username: "Mine",
      chatCuid: 1,
    });
  });

  it("shows and hides submitting indicator", async () => {
    const user = userEvent.setup();
    const chat = {
      users: [{}, {}],
    };
    let resolvePromise;

    vi.mocked(deleteChat).mockReturnValue(
      new Promise((resolve) => {
        resolvePromise = resolve;
      }),
    );

    render(<MessagesHeader chat={chat} isGroupChat={false} />);

    const leaveChatButton = screen.getByRole("button", { name: "Leave Chat" });
    await user.click(leaveChatButton);

    const heading = screen.getByRole("heading", {
      name: "Submitting...",
    });
    expect(heading).toBeInTheDocument();

    resolvePromise({
      message: "User left chat",
    });

    await waitFor(() => expect(heading).not.toBeInTheDocument());
  });

  it("shows success message", async () => {
    const user = userEvent.setup();
    const chat = {
      users: [{}, {}],
    };
    vi.mocked(deleteChat).mockResolvedValue({
      message: "User left chat",
    });

    render(<MessagesHeader chat={chat} isGroupChat={false} />);

    const leaveChatButton = screen.getByRole("button", { name: "Leave Chat" });
    await user.click(leaveChatButton);

    const text = await screen.findByText("User left chat");
    expect(text).toBeInTheDocument();
  });

  it("Reloads after successful creation", async () => {
    const user = userEvent.setup();
    const chat = {
      users: [{}, {}],
    };
    render(<MessagesHeader chat={chat} isGroupChat={false} />);

    const leaveChatButton = screen.getByRole("button", { name: "Leave Chat" });
    await user.click(leaveChatButton);

    expect(reloadPage).toHaveBeenCalled();
  });

  it("shows network error", async () => {
    const user = userEvent.setup();

    vi.mocked(deleteChat).mockRejectedValue(new Error("network"));

    const chat = {
      users: [{}, {}],
    };
    render(<MessagesHeader chat={chat} isGroupChat={false} />);

    const leaveChatButton = screen.getByRole("button", { name: "Leave Chat" });
    await user.click(leaveChatButton);

    const heading = screen.getByRole("heading", {
      name: "A network error was encountered",
    });
    expect(heading).toBeInTheDocument();
  });

  it("shows API validation errors 1/2", async () => {
    const user = userEvent.setup();

    vi.mocked(deleteChat).mockResolvedValue([
      {
        msg: "Username must be an email address",
      },
    ]);

    const chat = {
      users: [{}, {}],
    };
    render(<MessagesHeader chat={chat} isGroupChat={false} />);

    const leaveChatButton = screen.getByRole("button", { name: "Leave Chat" });
    await user.click(leaveChatButton);

    const heading = screen.getByRole("heading", {
      name: "Username must be an email address",
    });
    expect(heading).toBeInTheDocument();
  });

  it("shows API validation errors 2/2", async () => {
    const user = userEvent.setup();

    vi.mocked(deleteChat).mockResolvedValue({
      message: "User not found",
    });

    const chat = {
      users: [{}, {}],
    };
    render(<MessagesHeader chat={chat} isGroupChat={false} />);

    const leaveChatButton = screen.getByRole("button", { name: "Leave Chat" });
    await user.click(leaveChatButton);

    const heading = screen.getByRole("heading", {
      name: "User not found",
    });
    expect(heading).toBeInTheDocument();
  });
});
