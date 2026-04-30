import { describe, expect, it } from "vitest";

import {
  filterShowsByQuery,
  formatCountLabel,
  getQueryValue,
  groupShowsByGenre,
  sortShowsByRating,
} from ".";
import { createShow } from "./test-helpers";

describe("formatCountLabel", () => {
  it("formats singular and plural labels", () => {
    expect(formatCountLabel(1, "show")).toBe("1 show");
    expect(formatCountLabel(3, "result")).toBe("3 results");
  });
});

describe("sortShowsByRating", () => {
  it("sorts shows by rating descending without mutating the input", () => {
    const input = [
      createShow({ id: 1, name: "Second", rating: { average: 7.4 } }),
      createShow({ id: 2, name: "Top", rating: { average: 9.2 } }),
      createShow({ id: 3, name: "Unrated", rating: { average: null } }),
    ];

    const sorted = sortShowsByRating(input);

    expect(sorted.map((show) => show.name)).toEqual(["Top", "Second", "Unrated"]);
    expect(input.map((show) => show.name)).toEqual(["Second", "Top", "Unrated"]);
  });
});

describe("filterShowsByQuery", () => {
  const shows = [
    createShow({ id: 1, name: "Matlock", rating: { average: 7.4 } }),
    createShow({ id: 2, name: "Dark Matter", rating: { average: 8.9 } }),
    createShow({ id: 3, name: "The Office", rating: { average: 9.0 } }),
  ];

  it("matches case-insensitively and ignores surrounding whitespace", () => {
    const filtered = filterShowsByQuery(shows, "  mat ");
    expect(filtered.map((show) => show.name)).toEqual(["Dark Matter", "Matlock"]);
  });

  it("returns matching results sorted by rating", () => {
    const filtered = filterShowsByQuery(shows, "mat");
    expect(filtered.map((show) => show.name)).toEqual(["Dark Matter", "Matlock"]);
  });
});

describe("groupShowsByGenre", () => {
  it("groups shows by each genre and sorts each bucket by rating", () => {
    const shows = [
      createShow({ id: 1, name: "Alpha", genres: ["Drama", "Sci-Fi"], rating: { average: 7.1 } }),
      createShow({ id: 2, name: "Bravo", genres: ["Drama"], rating: { average: 9.4 } }),
      createShow({ id: 3, name: "Charlie", genres: ["Sci-Fi"], rating: { average: 8.3 } }),
    ];

    const grouped = groupShowsByGenre(shows);

    expect(grouped.get("Drama")?.map((show) => show.name)).toEqual(["Bravo", "Alpha"]);
    expect(grouped.get("Sci-Fi")?.map((show) => show.name)).toEqual(["Charlie", "Alpha"]);
  });
});

describe("getQueryValue", () => {
  it("returns empty string for null", () => {
    expect(getQueryValue(null)).toBe("");
  });
  it("returns the string value when given a string", () => {
    expect(getQueryValue("dark")).toBe("dark");
  });
  it("returns the first string in an array of strings", () => {
    expect(getQueryValue(["dark", "office"])).toBe("dark");
  });
  it("returns empty string if the first element in an array is not a string", () => {
    expect(getQueryValue([null, "office"])).toBe("");
  });
});
