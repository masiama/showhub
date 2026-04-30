<script setup lang="ts">
import { computed } from "vue";

import type { Show } from "../types/show";

const props = defineProps<{ show: Show }>();

const averageRating = computed(() => {
  const rating = props.show.rating.average;
  return rating === null ? "N/A" : rating.toFixed(1);
});

const releaseYear = computed(() => props.show.premiered.slice(0, 4));
const providerName = computed(
  () => props.show.network?.name ?? props.show.webChannel?.name ?? "TVMaze",
);
</script>

<template>
  <article
    class="group w-44 min-w-44 space-y-3 transition-transform duration-200 hover:-translate-y-0.5"
  >
    <div class="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm">
      <img
        :src="show.image.medium"
        :alt="`${show.name} poster`"
        class="aspect-2/3 w-full object-cover"
        loading="lazy"
      />
      <span
        class="absolute top-2.5 right-2.5 inline-flex min-w-10 items-center justify-center rounded-full bg-slate-950/85 px-2.5 py-1 text-xs font-semibold text-white"
      >
        {{ averageRating }}
      </span>
    </div>

    <div class="space-y-1">
      <p class="text-xs font-medium tracking-wider text-slate-500 uppercase">
        {{ releaseYear }} · {{ show.language }}
      </p>
      <h3 class="text-sm leading-5 font-semibold text-slate-950">{{ show.name }}</h3>
      <p class="text-sm text-slate-500">{{ providerName }}</p>
    </div>
  </article>
</template>
