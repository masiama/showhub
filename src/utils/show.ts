import type { Show } from "../types/show";

export const formatShowRating = (show: Pick<Show, "rating">): string => {
  const rating = show.rating.average;
  return rating === null ? "N/A" : rating.toFixed(1);
};

export const getShowYear = <T extends keyof Pick<Show, "premiered" | "ended">>(
  show: Pick<Show, T>,
  yearType: T,
): string | undefined => show[yearType]?.slice(0, 4);

export const getShowProviderName = (show: Pick<Show, "network" | "webChannel">): string =>
  show.network?.name ?? show.webChannel?.name ?? "TVMaze";
