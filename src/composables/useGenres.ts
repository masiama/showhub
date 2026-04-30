import { computed, type Ref } from "vue";

import type { Show } from "../types/show";
import { groupShowsByGenre } from "../utils";

export function useGenres(shows: Ref<Show[] | null>) {
  const showsByGenre = computed(() => groupShowsByGenre(shows.value ?? []));
  return { showsByGenre };
}
