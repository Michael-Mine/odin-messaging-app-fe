import { describe, it, expect, vi } from "vitest";
import updateProfile from "./updateProfile";

describe("updateProfile api fetch", () => {
  it("sends the correct POST request", async () => {
    window.fetch = vi.fn(() => {
      const response = { message: "User profile updated" };

      return Promise.resolve({
        json: () => Promise.resolve(response),
      });
    });

    await updateProfile({
      jwt: "2026",
      username: "M",
      name: "Mine",
      bio: "SWE",
    });

    expect(fetch).toHaveBeenCalledTimes(1);

    expect(fetch).toHaveBeenCalledWith(expect.stringContaining("profile"), {
      method: "PUT",
      headers: {
        Authorization: "Bearer 2026",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: "M",
        name: "Mine",
        bio: "SWE",
      }),
    });
  });

  it("returns the parsed response", async () => {
    const response = { message: "User profile updated" };

    window.fetch = vi.fn(() => {
      return Promise.resolve({
        json: () => Promise.resolve(response),
      });
    });

    const result = await updateProfile({
      jwt: "2026",
      username: "M",
      name: "Mine",
      bio: "SWE",
    });

    expect(result).toEqual(response);
  });

  it("rejects when fetch fails", async () => {
    window.fetch = vi.fn(() => {
      return Promise.reject(new Error("Network error"));
    });

    await expect(
      updateProfile({
        jwt: "2026",
        username: "M",
        name: "Mine",
        bio: "SWE",
      }),
    ).rejects.toThrow("Network error");
  });
});
