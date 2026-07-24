import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "./Header";
import reloadPage from "../utils/reloadPage";

vi.mock("../utils/reloadPage");

describe("Header component", () => {
  it("renders expected UI", () => {
    render(<Header />);

    const title = screen.getByRole("heading", {
      name: "Mr Mine Messaging App",
    });
    const profileButton = screen.getByRole("button", { name: "My Profile" });
    const logoutButton = screen.getByRole("button", { name: "Logout" });

    expect(title).toBeInTheDocument();
    expect(profileButton).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });

  it("renders to last snapshot", () => {
    render(<Header />);
    const { container } = render(<Header />);

    expect(container).toMatchSnapshot();
  });

  it("clicking My Profile button performs correct actions", async () => {
    const user = userEvent.setup();
    const setSideCompOpen = vi.fn();
    const getProfileUser = vi.fn();
    localStorage.setItem("MMA", "Mr Mine");

    render(
      <Header
        setSideCompOpen={setSideCompOpen}
        getProfileUser={getProfileUser}
      />,
    );

    const profileButton = screen.getByRole("button", { name: "My Profile" });
    await user.click(profileButton);

    expect(getProfileUser).toHaveBeenCalledWith("Mr Mine");
    expect(setSideCompOpen).toHaveBeenCalledWith("profile");
  });

  it("clicking Logout button logs user out", async () => {
    const user = userEvent.setup();
    const setLoggedIn = vi.fn();

    localStorage.setItem("MMA", "Mr Mine");
    localStorage.setItem("JWT", "token");

    render(<Header setLoggedIn={setLoggedIn} />);

    const logoutButton = screen.getByRole("button", { name: "Logout" });

    await user.click(logoutButton);

    expect(localStorage.getItem("JWT")).toBeNull();
    expect(localStorage.getItem("MMA")).toBeNull();
    expect(setLoggedIn).toHaveBeenCalledWith(false);
    expect(reloadPage).toHaveBeenCalled();
  });
});
