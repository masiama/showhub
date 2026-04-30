import * as z from "zod";

const CountrySchema = z.object({
  name: z.string(),
  code: z.string(),
  timezone: z.string(),
});

export const ShowSchema = z.object({
  id: z.number(),
  url: z.url(),
  name: z.string(),
  type: z.string(),
  language: z.string(),
  genres: z.array(z.string()),
  status: z.string(),
  runtime: z.number().nullable(),
  averageRuntime: z.number(),
  premiered: z.iso.date(),
  ended: z.iso.date().nullable(),
  officialSite: z.url().nullable(),
  schedule: z.object({
    time: z.string(),
    days: z.array(z.string()),
  }),
  rating: z.object({
    average: z.number().nullable(),
  }),
  weight: z.number(),
  network: z
    .object({
      id: z.number(),
      name: z.string(),
      country: CountrySchema,
      officialSite: z.url().nullable(),
    })
    .nullable(),
  webChannel: z
    .object({
      id: z.number(),
      name: z.string(),
      country: CountrySchema.nullable(),
      officialSite: z.url().nullable(),
    })
    .nullable(),
  dvdCountry: CountrySchema.nullable(),
  externals: z.object({
    tvrage: z.number().nullable(),
    thetvdb: z.number().nullable(),
    imdb: z.string().nullable(),
  }),
  image: z.object({
    medium: z.url(),
    original: z.url(),
  }),
  summary: z.string(),
  updated: z.number(),
  _links: z.object({
    self: z.object({ href: z.url() }),
    previousepisode: z.object({ href: z.url(), name: z.string() }),
  }),
});
export type Show = z.infer<typeof ShowSchema>;
export const ShowsSchema = z.array(ShowSchema);
