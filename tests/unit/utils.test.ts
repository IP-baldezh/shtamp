import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn (classname merger)", () => {
  it("merges two class strings", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles undefined and falsy values", () => {
    expect(cn("foo", undefined, false, null, "bar")).toBe("foo bar");
  });

  it("resolves Tailwind conflicts — last one wins", () => {
    // tailwind-merge: p-4 overrides p-2
    expect(cn("p-2", "p-4")).toBe("p-4");
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("handles conditional classes", () => {
    const isActive = true;
    expect(cn("base", isActive && "active")).toBe("base active");
    expect(cn("base", !isActive && "inactive")).toBe("base");
  });

  it("handles object syntax from clsx", () => {
    expect(cn({ "text-red-500": true, "text-blue-500": false })).toBe("text-red-500");
  });

  it("returns empty string for no args", () => {
    expect(cn()).toBe("");
  });
});
