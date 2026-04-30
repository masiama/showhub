<script setup lang="ts">
defineProps<{ eyebrow: string; title: string; meta: string }>();
</script>

<template>
  <header class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <p class="text-xs font-medium tracking-wider text-slate-500 uppercase">{{ eyebrow }}</p>
      <h2 class="text-2xl font-semibold tracking-tight text-slate-950">{{ title }}</h2>
    </div>
    <p class="text-sm text-slate-500">{{ meta }}</p>
  </header>
</template>
