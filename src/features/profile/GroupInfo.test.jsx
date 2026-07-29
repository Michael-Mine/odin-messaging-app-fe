import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GroupInfo from "./GroupInfo";
import AddMember from "./AddMember";

vi.mock("./AddMember");

describe("Group Info component", () => {
  it("renders group subject and buttons", () => {
    const chat = {
      subject: "Wroclaw Wedding",
      users: [{ name: "Mine" }],
    };
    render(<GroupInfo chat={chat} />);

    const title = screen.getByRole("heading", {
      name: "Wroclaw Wedding",
    });

    const addButton = screen.getByRole("button", { name: "Add Member" });
    const profileButton = screen.getByRole("button", { name: "Mine" });
    const closeButton = screen.getByRole("button", { name: "Close" });

    expect(title).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
    expect(profileButton).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
  });

  it("renders all group users buttons", () => {
    const chat = {
      subject: "Wroclaw Wedding",
      users: [{ name: "Mine" }, { name: "Josh" }, { name: "Staf" }],
    };
    render(<GroupInfo chat={chat} />);

    const profileButton1 = screen.getByRole("button", { name: "Mine" });
    const profileButton2 = screen.getByRole("button", { name: "Josh" });
    const profileButton3 = screen.getByRole("button", { name: "Staf" });

    expect(profileButton1).toBeInTheDocument();
    expect(profileButton2).toBeInTheDocument();
    expect(profileButton3).toBeInTheDocument();
  });

  it("add member is closed initially", () => {
    vi.mocked(AddMember).mockReturnValue(<div>Mock AddMember</div>);

    const chat = {
      subject: "Wroclaw Wedding",
      users: [{ name: "Mine" }],
    };
    render(<GroupInfo chat={chat} />);

    const addMemberMock = screen.queryByText("Mock AddMember");
    expect(addMemberMock).not.toBeInTheDocument();
  });

  it("add member opens/closes on clicks", async () => {
    const user = userEvent.setup();

    vi.mocked(AddMember).mockReturnValue(<div>Mock AddMember</div>);

    const chat = {
      subject: "Wroclaw Wedding",
      users: [{ name: "Mine" }],
    };
    render(<GroupInfo chat={chat} />);

    const addButton = screen.getByRole("button", { name: "Add Member" });
    await user.click(addButton);

    const addMemberMock = screen.getByText("Mock AddMember");
    expect(addMemberMock).toBeInTheDocument();

    await user.click(addButton);

    await waitFor(() => expect(addMemberMock).not.toBeInTheDocument());
  });

  it("clicking a member opens their profile", async () => {
    const user = userEvent.setup();
    const setSideCompOpen = vi.fn();
    const getProfileUser = vi.fn();

    const chat = {
      subject: "Wroclaw Wedding",
      users: [{ name: "Josh", username: "J" }],
    };
    render(
      <GroupInfo
        chat={chat}
        setSideCompOpen={setSideCompOpen}
        getProfileUser={getProfileUser}
      />,
    );

    const profileButton = screen.getByRole("button", { name: "Josh" });
    await user.click(profileButton);

    expect(getProfileUser).toHaveBeenCalledWith("J");
    expect(setSideCompOpen).toHaveBeenCalledWith("profile");
  });

  it("Close button calls setSideCompOpen", async () => {
    const user = userEvent.setup();
    const setSideCompOpen = vi.fn();

    const chat = {
      subject: "Wroclaw Wedding",
      users: [{ name: "Josh" }],
    };
    render(<GroupInfo chat={chat} setSideCompOpen={setSideCompOpen} />);

    const button = screen.getByRole("button", { name: "Close" });
    await user.click(button);

    expect(setSideCompOpen).toHaveBeenCalledWith(false);
  });
});
