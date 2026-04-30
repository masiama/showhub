<script setup lang="ts">
defineProps<{ label: string; value: string | number; valueClass?: string }>();
</script>

<template>
  <div class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
    <dt class="text-xs font-medium tracking-wider text-slate-500 uppercase">{{ label }}</dt>
    <dd :class="['mt-2 font-semibold tracking-tight text-slate-950', valueClass]">{{ value }}</dd>
  </div>
</template>
