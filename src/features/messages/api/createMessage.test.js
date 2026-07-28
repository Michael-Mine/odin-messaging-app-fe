import { describe, it, expect, vi } from "vitest";
import createMessage from "./createMessage";

describe("createMessage api fetch", () => {
  it("sends the correct POST request", async () => {
    window.fetch = vi.fn(() => {
      const response = { message: "New message created" };

      return Promise.resolve({
        json: () => Promise.resolve(response),
      });
    });

    await createMessage({
      jwt: "2026",
      username: "Mine",
      chatCuid: 1,
      content: "hi",
    });

    expect(fetch).toHaveBeenCalledTimes(1);

    expect(fetch).toHaveBeenCalledWith(expect.stringContaining("message"), {
      method: "POST",
      headers: {
        Authorization: "Bearer 2026",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: "Mine",
        chatCuid: 1,
        content: "hi",
      }),
    });
  });

  it("returns the parsed response", async () => {
    const response = { message: "New message created" };

    window.fetch = vi.fn(() => {
      return Promise.resolve({
        json: () => Promise.resolve(response),
      });
    });

    const result = await createMessage({
      jwt: "2026",
      username: "Mine",
      chatCuid: 1,
      content: "hi",
    });

    expect(result).toEqual(response);
  });

  it("rejects when fetch fails", async () => {
    window.fetch = vi.fn(() => {
      return Promise.reject(new Error("Network error"));
    });

    await expect(
      createMessage({
        jwt: "2026",
        username: "Mine",
        chatCuid: 1,
        content: "hi",
      }),
    ).rejects.toThrow("Network error");
  });
});
