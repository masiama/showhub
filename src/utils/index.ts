import type { Show } from "../types/show";

export const formatCountLabel = (count: number, singular: string): string =>
  `${count} ${singular}${count === 1 ? "" : "s"}`;

export const sortShowsByRating = (shows: Show[]): Show[] =>
  [...shows].sort((a, b) => (b.rating.average ?? 0) - (a.rating.average ?? 0));

export const filterShowsByQuery = (shows: Show[], query: string): Show[] => {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) return shows;

  return sortShowsByRating(
    shows.filter((show) => show.name.toLowerCase().includes(normalizedQuery)),
  );
};

export const groupShowsByGenre = (shows: Show[]): Map<string, Show[]> => {
  const genreMap = new Map<string, Show[]>();

  for (const show of shows) {
    for (const genre of show.genres) {
      if (!genreMap.has(genre)) {
        genreMap.set(genre, []);
      }
      genreMap.get(genre)!.push(show);
    }
  }

  for (const [genre, showsForGenre] of genreMap.entries()) {
    genreMap.set(genre, sortShowsByRating(showsForGenre));
  }

  return genreMap;
};
