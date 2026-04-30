<script setup lang="ts">
import { computed } from "vue";

import GenreRail from "../components/GenreRail.vue";
import MetricCard from "../components/MetricCard.vue";
import StatePanel from "../components/StatePanel.vue";
import { useGenres } from "../composables/useGenres";
import { useTVMaze } from "../composables/useTVMaze";
import { ShowsSchema } from "../types/show";

const { data, isFetching, error } = useTVMaze("/shows", ShowsSchema);
const { showsByGenre } = useGenres(data);

const totalShows = computed(() => data.value?.length ?? 0);
const genreSections = computed(() =>
  Array.from(showsByGenre.value.entries()).sort(
    ([leftGenre, leftShows], [rightGenre, rightShows]) =>
      rightShows.length - leftShows.length || leftGenre.localeCompare(rightGenre),
  ),
);
</script>

<template>
  <main class="mx-auto flex min-h-screen max-w-7xl flex-col gap-10 px-4 py-6 sm:px-6 lg:px-8">
    <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div class="grid gap-8 lg:grid-cols-[1fr_16rem] lg:items-start">
        <div class="space-y-4">
          <p class="text-xs font-medium tracking-wider text-slate-500 uppercase">
            TV show dashboard
          </p>
          <h1 class="max-w-3xl text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Browse top shows by genre.
          </h1>
          <p class="max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Explore curated rails based on the TVMaze catalog, with each genre sorted from highest
            rated to lowest rated.
          </p>
        </div>

        <dl class="grid grid-cols-2 gap-3 lg:grid-cols-1">
          <MetricCard label="Shows" :value="totalShows" value-class="text-2xl" />
          <MetricCard label="Genres" :value="genreSections.length" value-class="text-2xl" />
        </dl>
      </div>
    </section>

    <StatePanel
      v-if="error"
      title="Unable to load the TV catalog."
      :description="String(error)"
      tone="danger"
    />

    <StatePanel
      v-else-if="isFetching"
      title="Loading shows..."
      description="Pulling together the first set of genre rails."
    />

    <StatePanel
      v-else-if="genreSections.length === 0"
      title="No shows found."
      description="The catalog is currently empty, so there is nothing to group by genre yet."
    />

    <section v-else class="space-y-10">
      <GenreRail
        v-for="[genre, shows] in genreSections"
        :key="genre"
        :genre="genre"
        :shows="shows"
      />
    </section>
  </main>
</template>
