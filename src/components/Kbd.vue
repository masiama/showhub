<script setup lang="ts">
defineProps<{ code: string }>();
</script>

<template>
  <kbd
    class="rounded border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-[11px] text-slate-600"
  >
    {{ code }}
  </kbd>
</template>
