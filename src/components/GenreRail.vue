<script setup lang="ts">
import type { Show } from "../types/show";
import { formatCountLabel } from "../utils";
import SectionHeader from "./SectionHeader.vue";
import ShowCard from "./ShowCard.vue";

defineProps<{ genre: string; shows: Show[] }>();
</script>

<template>
  <section class="space-y-4">
    <SectionHeader eyebrow="Genre" :title="genre" :meta="formatCountLabel(shows.length, 'show')" />
    <div class="flex gap-4 overflow-x-auto py-1">
      <ShowCard v-for="show in shows" :key="show.id" :show="show" />
    </div>
  </section>
</template>
