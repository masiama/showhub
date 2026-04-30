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

export const getShowScheduleLabel = (show: Pick<Show, "schedule">): string => {
  const { days, time } = show.schedule;

  if (days.length === 0 && !time) return "Schedule unavailable";
  if (days.length === 0) return time;
  if (!time) return days.join(", ");

  return `${days.join(", ")} at ${time}`;
};

export const getShowRunYears = (show: Pick<Show, "premiered" | "ended">): string =>
  `${getShowYear(show, "premiered")} - ${getShowYear(show, "ended") ?? "Present"}`;
