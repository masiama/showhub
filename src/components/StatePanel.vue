<script setup lang="ts">
defineProps<{ title: string; description: string; tone?: "default" | "danger" }>();
</script>

<template>
  <section
    :class="[
      'rounded-2xl border px-5 py-4 shadow-sm',
      tone === 'danger'
        ? 'border-red-200 bg-red-50 text-red-950'
        : 'border-slate-200 bg-white text-slate-950',
    ]"
  >
    <h2 class="font-semibold">{{ title }}</h2>
    <p :class="['mt-1 text-sm', tone === 'danger' ? 'text-red-800' : 'text-slate-600']">
      {{ description }}
    </p>
  </section>
</template>
