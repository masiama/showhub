import { describe, expect, it } from "vitest";

import {
  formatShowRating,
  getShowProviderName,
  getShowRunYears,
  getShowScheduleLabel,
  getShowYear,
} from "./show";
import { createShow } from "./test-helpers";

describe("formatShowRating", () => {
  it("formats ratings and handles unrated shows", () => {
    expect(formatShowRating(createShow({ id: 1, name: "Rated", rating: { average: 8.45 } }))).toBe(
      "8.4",
    );
    expect(
      formatShowRating(createShow({ id: 2, name: "Unrated", rating: { average: null } })),
    ).toBe("N/A");
  });
});

describe("getShowYear", () => {
  it("extracts a year from a date string", () => {
    expect(
      getShowYear(createShow({ id: 1, name: "Show", premiered: "2026-01-01" }), "premiered"),
    ).toBe("2026");
  });
});

describe("getShowProviderName", () => {
  it("prefers network, then web channel, then falls back to TVMaze", () => {
    expect(
      getShowProviderName(
        createShow({
          id: 1,
          name: "Network show",
          network: {
            id: 1,
            name: "HBO",
            country: { name: "United States", code: "US", timezone: "America/New_York" },
            officialSite: null,
          },
        }),
      ),
    ).toBe("HBO");
    expect(
      getShowProviderName(
        createShow({
          id: 2,
          name: "Streamed show",
          network: null,
          webChannel: { id: 3, name: "Netflix", country: null, officialSite: null },
        }),
      ),
    ).toBe("Netflix");
    expect(
      getShowProviderName(
        createShow({ id: 3, name: "Fallback show", network: null, webChannel: null }),
      ),
    ).toBe("TVMaze");
  });
});

describe("getShowScheduleLabel", () => {
  it("formats common schedule combinations", () => {
    expect(getShowScheduleLabel(createShow({ id: 1, name: "Show" }))).toBe("Monday at 21:00");
    expect(
      getShowScheduleLabel(
        createShow({ id: 2, name: "No day", schedule: { time: "22:00", days: [] } }),
      ),
    ).toBe("22:00");
    expect(
      getShowScheduleLabel(
        createShow({ id: 3, name: "No schedule", schedule: { time: "", days: [] } }),
      ),
    ).toBe("Schedule unavailable");
  });
});

describe("getShowRunYears", () => {
  it("formats running and ended shows", () => {
    expect(
      getShowRunYears(createShow({ id: 1, name: "Running show", premiered: "2026-01-01" })),
    ).toBe("2026 - Present");
    expect(
      getShowRunYears(
        createShow({ id: 2, name: "Ended show", premiered: "2026-01-01", ended: "2030-01-01" }),
      ),
    ).toBe("2026 - 2030");
  });
});
