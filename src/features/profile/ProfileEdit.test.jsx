import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProfileEdit from "./ProfileEdit";
import updateProfile from "./api/updateProfile";

vi.mock("./api/updateProfile");

describe("Profile Edit component", () => {
  it("renders button and user details in inputs", () => {
    const user = {
      name: "Mine",
      username: "M",
      bio: "SWE",
    };

    render(<ProfileEdit user={user} />);

    const nameInput = screen.getByTestId("name-input");
    const bioInput = screen.getByTestId("bio-input");
    const button = screen.getByRole("button", { name: "Submit" });

    expect(nameInput.value).toBe("Mine");
    expect(bioInput.value).toBe("SWE");
    expect(button).toBeInTheDocument();
  });

  it("input values are updated correctly", async () => {
    const userE = userEvent.setup();

    const user = {
      name: "Mine",
      username: "M",
      bio: "SWE",
    };

    render(<ProfileEdit user={user} />);

    const nameInput = screen.getByTestId("name-input");
    const bioInput = screen.getByTestId("bio-input");

    await userE.type(nameInput, " London");
    await userE.type(bioInput, " from SE2");

    expect(nameInput.value).toBe("Mine London");
    expect(bioInput.value).toBe("SWE from SE2");
  });

  it("clicking submit calls updateProfile() correctly", async () => {
    const userE = userEvent.setup();

    vi.mocked(updateProfile).mockResolvedValue({
      message: "User profile updated",
    });

    localStorage.setItem("JWT", "token");
    localStorage.setItem("MMA", "M");

    const user = {
      name: "Mine",
      username: "M",
      bio: "SWE",
    };

    render(<ProfileEdit user={user} />);

    const nameInput = screen.getByTestId("name-input");
    const bioInput = screen.getByTestId("bio-input");

    await userE.type(nameInput, " London");
    await userE.type(bioInput, " from SE2");

    const button = screen.getByRole("button", { name: "Submit" });
    await userE.click(button);

    expect(updateProfile).toHaveBeenCalledWith({
      jwt: "token",
      username: "M",
      name: "Mine London",
      bio: "SWE from SE2",
    });
  });

  it("shows and hides submitting indicator", async () => {
    const userE = userEvent.setup();

    let resolvePromise;

    vi.mocked(updateProfile).mockReturnValue(
      new Promise((resolve) => {
        resolvePromise = resolve;
      }),
    );

    const user = {
      name: "Mine",
      username: "M",
      bio: "SWE",
    };

    render(<ProfileEdit user={user} />);

    const button = screen.getByRole("button", { name: "Submit" });
    await userE.click(button);

    const heading = screen.getByRole("heading", {
      name: "Submitting...",
    });
    expect(heading).toBeInTheDocument();

    resolvePromise({
      message: "New message created",
    });

    await waitFor(() => expect(heading).not.toBeInTheDocument());
  });

  it("shows success message", async () => {
    const userE = userEvent.setup();

    vi.mocked(updateProfile).mockResolvedValue({
      message: "User profile updated",
    });

    const user = {
      name: "Mine",
      username: "M",
      bio: "SWE",
    };

    render(<ProfileEdit user={user} />);

    const button = screen.getByRole("button", { name: "Submit" });
    await userE.click(button);

    const text = await screen.findByText("User profile updated");
    expect(text).toBeInTheDocument();
  });

  it("calls setProfileUser after updated", async () => {
    const userE = userEvent.setup();
    const setProfileUser = vi.fn();

    vi.mocked(updateProfile).mockResolvedValue({
      message: "User profile updated",
      updatedUser: "hi",
    });
    const user = {
      name: "Mine",
      username: "M",
      bio: "SWE",
    };

    render(<ProfileEdit user={user} setProfileUser={setProfileUser} />);

    const button = screen.getByRole("button", { name: "Submit" });
    await userE.click(button);

    expect(setProfileUser).toHaveBeenCalledWith("hi");
  });

  it("shows network error", async () => {
    const userE = userEvent.setup();

    vi.mocked(updateProfile).mockRejectedValue(new Error("network"));

    const user = {
      name: "Mine",
      username: "M",
      bio: "SWE",
    };
    render(<ProfileEdit user={user} />);

    const button = screen.getByRole("button", { name: "Submit" });
    await userE.click(button);

    const heading = screen.getByRole("heading", {
      name: "A network error was encountered",
    });
    expect(heading).toBeInTheDocument();
  });

  it("shows API validation errors 1/2", async () => {
    const userE = userEvent.setup();

    vi.mocked(updateProfile).mockResolvedValue([
      {
        msg: "Username must be an email address",
      },
    ]);

    const user = {
      name: "Mine",
      username: "M",
      bio: "SWE",
    };
    render(<ProfileEdit user={user} />);

    const button = screen.getByRole("button", { name: "Submit" });
    await userE.click(button);

    const heading = screen.getByRole("heading", {
      name: "Username must be an email address",
    });
    expect(heading).toBeInTheDocument();
  });

  it("shows API validation errors 2/2", async () => {
    const userE = userEvent.setup();

    vi.mocked(updateProfile).mockResolvedValue({
      message: "User not found",
    });

    const user = {
      name: "Mine",
      username: "M",
      bio: "SWE",
    };
    render(<ProfileEdit user={user} />);

    const button = screen.getByRole("button", { name: "Submit" });
    await userE.click(button);

    const heading = screen.getByRole("heading", {
      name: "User not found",
    });
    expect(heading).toBeInTheDocument();
  });
});
