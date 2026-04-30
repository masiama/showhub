<script setup lang="ts">
import { onKeyDown, onKeyPressed } from "@vueuse/core";
import { computed, ref, useTemplateRef } from "vue";

import GenreRail from "../components/GenreRail.vue";
import Kbd from "../components/Kbd.vue";
import MetricCard from "../components/MetricCard.vue";
import PageShell from "../components/PageShell.vue";
import SectionHeader from "../components/SectionHeader.vue";
import ShowCard from "../components/ShowCard.vue";
import StatePanel from "../components/StatePanel.vue";
import { useGenres } from "../composables/useGenres";
import { useTVMaze } from "../composables/useTVMaze";
import { ShowsSchema } from "../types/show";
import { filterShowsByQuery, formatCountLabel } from "../utils";

const { data, isFetching, error } = useTVMaze("/shows", ShowsSchema);
const { showsByGenre } = useGenres(data);

const searchInput = useTemplateRef("searchInput");
const searchQuery = ref();

const totalShows = computed(() => data.value?.length ?? 0);
const trimmedSearchQuery = computed(() => searchQuery.value.trim());
const isSearching = computed(() => trimmedSearchQuery.value.length > 0);
const filteredShows = computed(() =>
  data.value ? filterShowsByQuery(data.value, trimmedSearchQuery.value) : [],
);
const searchResultsTitle = computed(() => `Matches for "${trimmedSearchQuery.value}"`);
const genreSections = computed(() =>
  Array.from(showsByGenre.value.entries()).sort(
    ([leftGenre, leftShows], [rightGenre, rightShows]) =>
      rightShows.length - leftShows.length || leftGenre.localeCompare(rightGenre),
  ),
);

const clearSearch = () => (searchQuery.value = "");

onKeyPressed("/", (e) => {
  e.preventDefault();
  searchInput.value?.focus();
  searchInput.value?.select();
});

onKeyDown("Escape", (event) => {
  if (searchInput.value !== document.activeElement) return;
  event.preventDefault();

  if (searchQuery.value) {
    clearSearch();
  } else {
    searchInput.value?.blur();
  }
});
</script>

<template>
  <PageShell>
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

          <div class="max-w-xl space-y-2">
            <label
              for="show-search"
              class="block text-xs font-medium tracking-wider text-slate-500 uppercase"
            >
              Search shows
            </label>
            <div
              class="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-slate-950 focus-within:ring-1 focus-within:ring-slate-950"
            >
              <input
                ref="searchInput"
                id="show-search"
                v-model="searchQuery"
                type="search"
                placeholder="Search by show name"
                class="w-full border-0 bg-transparent p-0 text-sm text-slate-950 outline-none placeholder:text-slate-400"
              />
              <button
                v-if="searchQuery"
                type="button"
                class="rounded-sm text-sm font-medium text-slate-500 transition-colors hover:text-slate-950 focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 focus-visible:outline-none"
                @click="clearSearch"
              >
                Clear
              </button>
            </div>
            <p class="text-xs text-slate-500">
              Press
              <Kbd code="/" />
              to focus and
              <Kbd code="Esc" />
              to clear.
            </p>
          </div>
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

    <template v-else-if="isSearching">
      <StatePanel
        v-if="filteredShows.length === 0"
        title="No shows found."
        :description="`No matches found for “${trimmedSearchQuery}”. Try another title.`"
      />
      <section v-else class="space-y-5">
        <SectionHeader
          eyebrow="Search results"
          :title="searchResultsTitle"
          :meta="formatCountLabel(filteredShows.length, 'result')"
        />

        <div class="flex flex-wrap gap-4">
          <ShowCard v-for="show in filteredShows" :key="show.id" :show="show" />
        </div>
      </section>
    </template>

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
  </PageShell>
</template>
