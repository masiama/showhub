<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

import MetricCard from "../../components/MetricCard.vue";
import PageShell from "../../components/PageShell.vue";
import StatePanel from "../../components/StatePanel.vue";
import { useTVMaze } from "../../composables/useTVMaze";
import { ShowSchema } from "../../types/show";
import {
  formatShowRating,
  getShowProviderName,
  getShowRunYears,
  getShowScheduleLabel,
} from "../../utils/show";

const route = useRoute("/shows/[id]");

const { data: show, isFetching, error } = useTVMaze(`/shows/${route.params.id}`, ShowSchema);

const averageRating = computed(() => (show.value ? formatShowRating(show.value) : ""));
const providerName = computed(() => (show.value ? getShowProviderName(show.value) : ""));
const scheduleLabel = computed(() => (show.value ? getShowScheduleLabel(show.value) : ""));
const runYears = computed(() => (show.value ? getShowRunYears(show.value) : ""));
</script>

<template>
  <PageShell>
    <RouterLink
      to="/"
      class="inline-flex w-fit items-center gap-2 rounded-sm text-sm font-medium text-slate-600 transition-colors hover:text-slate-950 focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      <span>←</span>
      Back to dashboard
    </RouterLink>

    <StatePanel
      v-if="error"
      title="Unable to load this show."
      :description="String(error)"
      tone="danger"
    />

    <StatePanel
      v-else-if="isFetching"
      title="Loading show details..."
      description="Pulling the latest information for this title."
    />

    <section
      v-else-if="show"
      class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <div class="grid gap-8 p-5 sm:p-8 lg:grid-cols-[22rem_1fr]">
        <div class="space-y-4">
          <div class="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
            <img
              :src="show.image.original"
              :alt="`${show.name} poster`"
              class="aspect-2/3 w-full object-cover"
            />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <MetricCard label="Rating" :value="averageRating" value-class="text-2xl" />
            <MetricCard label="Run" :value="runYears" value-class="text-lg" />
          </div>
        </div>

        <div class="space-y-6">
          <div class="space-y-4">
            <div class="space-y-2">
              <p class="text-xs font-medium tracking-wider text-slate-500 uppercase">
                {{ show.type }} · {{ show.language }}
              </p>
              <h1 class="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                {{ show.name }}
              </h1>
              <p class="text-sm leading-6 text-slate-600 sm:text-base">
                Streaming on {{ providerName }}
              </p>
            </div>

            <div class="flex flex-wrap gap-2">
              <span
                v-for="genre in show.genres"
                :key="genre"
                class="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-700"
              >
                {{ genre }}
              </span>
            </div>
          </div>

          <dl class="grid gap-3 sm:grid-cols-2">
            <MetricCard label="Status" :value="show.status" value-class="text-sm" />
            <MetricCard label="Schedule" :value="scheduleLabel" value-class="text-sm" />
            <MetricCard
              label="Average runtime"
              :value="`${show.runtime ?? show.averageRuntime} min`"
              value-class="text-sm"
            />
            <MetricCard label="Premiered" :value="show.premiered" value-class="text-sm" />
          </dl>

          <section class="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
            <h2 class="text-sm font-semibold text-slate-950">Summary</h2>
            <div
              class="mt-3 text-sm leading-7 text-slate-700 [&_b]:font-semibold [&_i]:italic [&_p+p]:mt-4"
              v-html="show.summary"
            />
          </section>
        </div>
      </div>
    </section>
  </PageShell>
</template>
