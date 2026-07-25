import { describe, it, expect, vi } from "vitest";
import createChat from "./createChat";

describe("createChat api fetch", () => {
  it("sends the correct POST request", async () => {
    window.fetch = vi.fn(() => {
      const response = { message: "New chat created" };

      return Promise.resolve({
        json: () => Promise.resolve(response),
      });
    });

    await createChat({
      jwt: "2026",
      username: "Mine",
      username2: "Josh",
      subject: "J2",
    });

    expect(fetch).toHaveBeenCalledTimes(1);

    expect(fetch).toHaveBeenCalledWith(expect.stringContaining("chat"), {
      method: "POST",
      headers: {
        Authorization: "Bearer 2026",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: "Mine",
        username2: "Josh",
        subject: "J2",
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

    const result = await createChat({
      jwt: "2026",
      username: "Mine",
      username2: "Josh",
      subject: "J2",
    });

    expect(result).toEqual(response);
  });

  it("rejects when fetch fails", async () => {
    window.fetch = vi.fn(() => {
      return Promise.reject(new Error("Network error"));
    });

    await expect(
      createChat({
        jwt: "2026",
        username: "Mine",
        username2: "Josh",
        subject: "J2",
      }),
    ).rejects.toThrow("Network error");
  });
});
