import { describe, it, expect, vi } from "vitest";
import deleteChat from "./deleteChat";

describe("deleteChat api fetch", () => {
  it("sends the correct POST request", async () => {
    window.fetch = vi.fn(() => {
      const response = { message: "User left chat" };

      return Promise.resolve({
        json: () => Promise.resolve(response),
      });
    });

    await deleteChat({
      jwt: "2026",
      username: "Mine",
      chatCuid: 1,
    });

    expect(fetch).toHaveBeenCalledTimes(1);

    expect(fetch).toHaveBeenCalledWith(expect.stringContaining("chat"), {
      method: "DELETE",
      headers: {
        Authorization: "Bearer 2026",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: "Mine",
        chatCuid: 1,
      }),
    });
  });

  it("returns the parsed response", async () => {
    const response = { message: "New chat created" };

    window.fetch = vi.fn(() => {
      return Promise.resolve({
        json: () => Promise.resolve(response),
      });
    });

    const result = await deleteChat({
      jwt: "2026",
      username: "Mine",
      chatCuid: 1,
    });

    expect(result).toEqual(response);
  });

  it("rejects when fetch fails", async () => {
    window.fetch = vi.fn(() => {
      return Promise.reject(new Error("Network error"));
    });

    await expect(
      deleteChat({
        jwt: "2026",
        username: "Mine",
        chatCuid: 1,
      }),
    ).rejects.toThrow("Network error");
  });
});
