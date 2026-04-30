<script setup lang="ts">
import { useGenres } from "../composables/useGenres";
import { useTVMaze } from "../composables/useTVMaze";
import { ShowsSchema } from "../types/show";

const { data, isFetching, error } = useTVMaze("/shows", ShowsSchema);
const { showsByGenre } = useGenres(data);
</script>

<template>
  <div v-if="error" class="error">Error loading shows: {{ error }}</div>
  <h1 v-else-if="isFetching">Loading...</h1>
  <div v-else>
    <ul>
      <li v-for="[genre, shows] of showsByGenre" :key="genre">
        <h2>{{ genre }}</h2>
        <ul>
          <li v-for="show in shows" :key="show.id">
            {{ show.name }} - {{ show.rating?.average ?? "N/A" }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
