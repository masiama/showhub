import type { Show } from "../types/show";

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

  for (const shows of genreMap.values()) {
    shows.sort((a, b) => (b.rating?.average ?? 0) - (a.rating?.average ?? 0));
  }

  return genreMap;
};
