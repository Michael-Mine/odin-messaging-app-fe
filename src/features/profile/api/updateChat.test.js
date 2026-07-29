import { describe, it, expect, vi } from "vitest";
import updateChat from "./updateChat";

describe("updateChat api fetch", () => {
  it("sends the correct PUT request", async () => {
    window.fetch = vi.fn(() => {
      const response = { message: "New member added" };

      return Promise.resolve({
        json: () => Promise.resolve(response),
      });
    });

    await updateChat({
      jwt: "2026",
      username: "M",
      username2: "J",
      chatCuid: 1,
    });

    expect(fetch).toHaveBeenCalledTimes(1);

    expect(fetch).toHaveBeenCalledWith(expect.stringContaining("chat"), {
      method: "PUT",
      headers: {
        Authorization: "Bearer 2026",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: "M",
        username2: "J",
        chatCuid: 1,
      }),
    });
  });

  it("returns the parsed response", async () => {
    const response = { message: "New member added" };

    window.fetch = vi.fn(() => {
      return Promise.resolve({
        json: () => Promise.resolve(response),
      });
    });

    const result = await updateChat({
      jwt: "2026",
      username: "M",
      username2: "J",
      chatCuid: 1,
    });

    expect(result).toEqual(response);
  });

  it("rejects when fetch fails", async () => {
    window.fetch = vi.fn(() => {
      return Promise.reject(new Error("Network error"));
    });

    await expect(
      updateChat({
        jwt: "2026",
        username: "M",
        username2: "J",
        chatCuid: 1,
      }),
    ).rejects.toThrow("Network error");
  });
});
