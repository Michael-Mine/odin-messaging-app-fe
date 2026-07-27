import { describe, it, expect } from "vitest";
import shouldShowDivider from "./shouldShowDivider";

describe("shouldShowDivider utility function", () => {
  const messages = [
    {
      createdAt: "2026-07-27T09:00:00Z",
    },
    {
      createdAt: "2026-07-27T15:30:00Z",
    },
    {
      createdAt: "2026-07-28T08:00:00Z",
    },
  ];

  it("returns true for the first message", () => {
    expect(shouldShowDivider(messages, 0)).toBe(true);
  });

  it("returns false when the previous message is on the same day", () => {
    expect(shouldShowDivider(messages, 1)).toBe(false);
  });

  it("returns true when the previous message is on a different day", () => {
    expect(shouldShowDivider(messages, 2)).toBe(true);
  });
});
