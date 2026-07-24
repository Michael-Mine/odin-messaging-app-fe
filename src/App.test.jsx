import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App.jsx";

describe("App component", () => {
  it("renders login component", () => {
    render(<App />);

    const title = screen.getByRole("heading", { name: "Login to access" });
    expect(title).toBeInTheDocument();
  });

  it("renders header, inputs & buttons", () => {
    render(<App />);
    const { container } = render(<App />);

    expect(container).toMatchSnapshot();
  });
});
