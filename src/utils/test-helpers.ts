import type { Show } from "../types/show";

type ShowOverrides = Partial<Show> & Pick<Show, "id" | "name">;

export const createShow = (overrides: ShowOverrides): Show => ({
  url: `https://example.com/shows/${overrides.id}`,
  type: "Scripted",
  language: "English",
  genres: ["Drama"],
  status: "Running",
  runtime: 60,
  averageRuntime: 60,
  premiered: "2026-04-30",
  ended: null,
  officialSite: null,
  schedule: { time: "21:00", days: ["Monday"] },
  rating: { average: null },
  weight: 90,
  network: null,
  webChannel: null,
  dvdCountry: null,
  externals: { tvrage: null, thetvdb: null, imdb: null },
  image: {
    medium: "https://example.com/shows/medium.jpg",
    original: "https://example.com/shows/original.jpg",
  },
  summary: "<p>Summary</p>",
  updated: 1,
  _links: {
    self: { href: `https://api.tvmaze.com/shows/${overrides.id}` },
    previousepisode: {
      href: `https://api.tvmaze.com/episodes/${overrides.id}`,
      name: "Previous Episode",
    },
  },
  ...overrides,
});
