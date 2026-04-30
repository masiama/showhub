<script setup lang="ts">
import type { Show } from "../types/show";
import ShowCard from "./ShowCard.vue";

defineProps<{ genre: string; shows: Show[] }>();
</script>

<template>
  <section class="space-y-4">
    <header class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-xs font-medium tracking-wider text-slate-500 uppercase">Genre</p>
        <h2 class="text-2xl font-semibold tracking-tight text-slate-950">
          {{ genre }}
        </h2>
      </div>
      <p class="text-sm text-slate-500">
        {{ shows.length }} show{{ shows.length !== 1 ? "s" : "" }}
      </p>
    </header>

    <div class="flex gap-4 overflow-x-auto py-1">
      <ShowCard v-for="show in shows" :key="show.id" :show="show" />
    </div>
  </section>
</template>
