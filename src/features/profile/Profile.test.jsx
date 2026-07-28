import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Profile from "./Profile";

describe("Profile component", () => {
  it("renders other users profile details and button", () => {
    const user = {
      name: "Mine",
      username: "M",
      bio: "SWE",
    };

    render(<Profile user={user} />);

    const name = screen.getByRole("heading", { name: "Mine Profile" });
    const username = screen.getByRole("heading", { name: "M" });
    const bio = screen.getByText("SWE");
    const button = screen.getByRole("button", { name: "Close" });

    expect(name).toBeInTheDocument();
    expect(username).toBeInTheDocument();
    expect(bio).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("Close button calls setSideCompOpen", async () => {
    const userE = userEvent.setup();
    const setSideCompOpen = vi.fn();

    const user = {
      name: "Mine",
      username: "M",
      bio: "SWE",
    };

    render(<Profile user={user} setSideCompOpen={setSideCompOpen} />);

    const button = screen.getByRole("button", { name: "Close" });
    await userE.click(button);

    expect(setSideCompOpen).toHaveBeenCalledWith(false);
  });

  it("doesn't renders edit button if other user's profile", () => {
    const user = {
      name: "Mine",
      username: "M",
      bio: "SWE",
    };

    render(<Profile user={user} />);

    const button = screen.queryByRole("button", { name: "Edit" });
    expect(button).not.toBeInTheDocument();
  });

  it("renders edit button if own profile", () => {
    const user = {
      name: "Mine",
      username: "M",
      bio: "SWE",
    };
    localStorage.setItem("MMA", "M");

    render(<Profile user={user} />);

    const button = screen.getByRole("button", { name: "Edit" });
    expect(button).toBeInTheDocument();
  });

  it("clicking edit button open edit form", async () => {
    const userE = userEvent.setup();
    const user = {
      name: "Mine",
      username: "M",
      bio: "SWE",
    };
    localStorage.setItem("MMA", "M");

    render(<Profile user={user} />);

    const editButton = screen.getByRole("button", { name: "Edit" });
    await userE.click(editButton);

    const submitButton = screen.getByRole("button", { name: "Submit" });
    expect(submitButton).toBeInTheDocument();
  });

  it("clicking edit button again closes edit form", async () => {
    const userE = userEvent.setup();
    const user = {
      name: "Mine",
      username: "M",
      bio: "SWE",
    };
    localStorage.setItem("MMA", "M");

    render(<Profile user={user} />);

    const editButton = screen.getByRole("button", { name: "Edit" });
    await userE.click(editButton);

    const submitButton = screen.getByRole("button", { name: "Submit" });
    expect(submitButton).toBeInTheDocument();

    await userE.click(editButton);

    await waitFor(() => expect(submitButton).not.toBeInTheDocument());
  });
});
