import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./Home";
import useChats from "../hooks/useChats";
import Header from "../layouts/Header";
import Chats from "../components/Chats";
import Messages from "../components/Messages";
import Profile from "../components/Profile";
import GroupInfo from "../components/GroupInfo";

vi.mock("../hooks/useChats");
// vi.mock("../layouts/Header");
// vi.mock("../layouts/Header", () => ({
//   default: ({ getProfileUser }) => (
//     <button onClick={() => getProfileUser("mr@mine.net")}>My Profile</button>
//   ),
// }));

// vi.mock("../components/Profile", () => ({
//   default: ({ user }) => <div>{user.name} Profile</div>,
// }));

describe("Home component", () => {
  it("renders loading heading", () => {
    vi.mocked(useChats).mockReturnValue({
      chats: [],
      error: null,
      loading: true,
    });

    render(<Home />);

    const title = screen.getByRole("heading", { name: "Loading..." });
    expect(title).toBeInTheDocument();
  });

  it("renders error heading", () => {
    vi.mocked(useChats).mockReturnValue({
      chats: [],
      error: true,
      loading: false,
    });

    render(<Home />);

    const title = screen.getByRole("heading", {
      name: "A network error was encountered",
    });
    expect(title).toBeInTheDocument();
  });

  it("renders Header & Chat components", () => {
    vi.mocked(useChats).mockReturnValue({
      chats: [],
      error: null,
      loading: false,
    });

    render(<Home />);

    const headingTitle = screen.getByRole("heading", {
      name: "Mr Mine Messaging App",
    });
    const ChatTitle = screen.getByRole("heading", {
      name: "Chats",
    });
    expect(headingTitle).toBeInTheDocument();
    expect(ChatTitle).toBeInTheDocument();
  });

  it("gets user profile from chats", async () => {
    const user = userEvent.setup();
    localStorage.setItem("MMA", "mr@mine.net");

    vi.mocked(useChats).mockReturnValue({
      chats: [
        {
          users: [
            {
              username: "mr@mine.net",
              name: "Mr Mine",
            },
          ],
        },
      ],
      error: null,
      loading: false,
    });

    render(<Home />);

    const profileButton = screen.getByRole("button", { name: "My Profile" });
    await user.click(profileButton);

    const ProfileTitle = screen.getByText("Mr Mine Profile");
    expect(ProfileTitle).toBeInTheDocument();
  });

  it("fetches profile when no chats exist", async () => {
    const user = userEvent.setup();

    window.fetch = vi.fn(() => {
      const response = { username: "mr@mine.net", name: "Mr Mine" };

      return Promise.resolve({
        json: () => Promise.resolve(response),
      });
    });

    vi.mocked(useChats).mockReturnValue({
      chats: [],
      error: null,
      loading: false,
    });

    render(<Home />);

    const profileButton = screen.getByRole("button", { name: "My Profile" });
    await user.click(profileButton);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("profile"),
      expect.objectContaining({
        method: "POST",
      }),
    );
  });

  it("opens messages when chat selected", async () => {
    const user = userEvent.setup();
    localStorage.setItem("MMA", "mr@mine.net");

    vi.mocked(useChats).mockReturnValue({
      chats: [
        {
          users: [
            {
              username: "mr@mine.net",
              name: "Mr Mine",
            },
            {
              username: "mr@mine2.net",
              name: "Mr Mine2",
            },
          ],
          messages: [],
        },
      ],
      error: null,
      loading: false,
    });

    render(<Home />);

    const chatButton = screen.getByRole("button", { name: "Mr Mine2" });
    await user.click(chatButton);

    const title = screen.getByRole("heading", { name: "Mr Mine2" });
    expect(title).toBeInTheDocument();
  });

  it("opens profile when clicked in messages", async () => {
    const user = userEvent.setup();
    localStorage.setItem("MMA", "mr@mine.net");

    vi.mocked(useChats).mockReturnValue({
      chats: [
        {
          users: [
            {
              username: "mr@mine.net",
              name: "Mr Mine",
            },
            {
              username: "mr@mine2.net",
              name: "Mr Mine2",
            },
          ],
          messages: [],
        },
      ],
      error: null,
      loading: false,
    });

    render(<Home />);

    const chatButton = screen.getByRole("button", { name: "Mr Mine2" });
    await user.click(chatButton);

    const profileButton = screen.getByRole("button", { name: "Profile" });
    await user.click(profileButton);

    const profileTitle = screen.getByText("Mr Mine2 Profile");
    expect(profileTitle).toBeInTheDocument();
  });

  it("opens group info when clicked in messages", async () => {
    const user = userEvent.setup();
    localStorage.setItem("MMA", "mr@mine.net");

    vi.mocked(useChats).mockReturnValue({
      chats: [
        {
          users: [
            {
              username: "mr@mine.net",
              name: "Mr Mine",
            },
            {
              username: "mr@mine2.net",
              name: "Mr Mine2",
            },
          ],
          messages: [],
          subject: "Mine Group",
        },
      ],
      error: null,
      loading: false,
    });

    render(<Home />);

    const chatButton = screen.getByRole("button", { name: "Mine Group" });
    await user.click(chatButton);

    const profileButton = screen.getByRole("button", { name: "Group Info" });
    await user.click(profileButton);

    const addMemberButton = screen.getByRole("button", { name: "Add Member" });
    expect(addMemberButton).toBeInTheDocument();
  });
});
