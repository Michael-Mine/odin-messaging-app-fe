import { describe, it, expect } from "vitest";
import getHeading from "./getHeading";

describe("getHeading utility function", () => {
  const username = "M";

  it("returns chat subject if group chat", () => {
    const chat = { subject: "Group chat" };
    const isGroupChat = true;

    expect(getHeading(chat, username, isGroupChat)).toBe("Group chat");
  });

  it("returns message if no other user in chat", () => {
    const chat = { subject: "Group chat", users: [0] };
    const isGroupChat = false;

    expect(getHeading(chat, username, isGroupChat)).toBe(
      "No other user in chat",
    );
  });

  it("returns other user name", () => {
    const chat = {
      subject: "Group chat",
      users: [
        { username: "J", name: "Josh" },
        { username: "M", name: "Mine" },
      ],
    };
    const isGroupChat = false;

    expect(getHeading(chat, username, isGroupChat)).toBe("Josh");
  });

  it("returns other user name 2nd", () => {
    const chat = {
      subject: "Group chat",
      users: [
        { username: "M", name: "Mine" },
        { username: "J", name: "Josh" },
      ],
    };
    const isGroupChat = false;

    expect(getHeading(chat, username, isGroupChat)).toBe("Josh");
  });
});
