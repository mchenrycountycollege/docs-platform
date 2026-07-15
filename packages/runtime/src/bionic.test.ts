import { describe, expect, it } from "vitest";
import { bionicSplit } from "./bionic.js";

describe("bionicSplit", () => {
  it("bolds the whole word when it's a single letter", () => {
    expect(bionicSplit("a")).toEqual(["a", ""]);
  });

  it("bolds at least one letter for a short word", () => {
    expect(bionicSplit("to")).toEqual(["t", "o"]);
  });

  it("bolds roughly the first 45% of letters", () => {
    expect(bionicSplit("reading")).toEqual(["rea", "ding"]);
  });

  it("preserves the original casing", () => {
    expect(bionicSplit("Reading")).toEqual(["Rea", "ding"]);
  });
});
