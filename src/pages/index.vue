<script setup lang="ts">
import { computed } from "vue";

import GenreRail from "../components/GenreRail.vue";
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
          <div class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <dt class="text-xs font-medium tracking-wider text-slate-500 uppercase">Shows</dt>
            <dd class="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
              {{ totalShows }}
            </dd>
          </div>
          <div class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <dt class="text-xs font-medium tracking-wider text-slate-500 uppercase">Genres</dt>
            <dd class="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
              {{ genreSections.length }}
            </dd>
          </div>
        </dl>
      </div>
    </section>

    <section
      v-if="error"
      class="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-950 shadow-sm"
    >
      <h2 class="font-semibold">Unable to load the TV catalog.</h2>
      <p class="mt-1 text-sm text-red-800">{{ error }}</p>
    </section>

    <section
      v-else-if="isFetching"
      class="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-slate-950 shadow-sm"
    >
      <h2 class="font-semibold">Loading shows...</h2>
      <p class="mt-1 text-sm text-slate-600">Pulling together the first set of genre rails.</p>
    </section>

    <section
      v-else-if="genreSections.length === 0"
      class="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-slate-950 shadow-sm"
    >
      <h2 class="font-semibold">No shows found.</h2>
      <p class="mt-1 text-sm text-slate-600">
        The catalog is currently empty, so there is nothing to group by genre yet.
      </p>
    </section>

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
