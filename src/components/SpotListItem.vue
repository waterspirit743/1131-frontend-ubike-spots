<template>
  <div
    class="b-1 b-amber rounded-0.25rem flex flex-col gap0.25rem p-0.25rem hover:bg-white/10 active:bg-white/30 cursor-pointer"
    :class="{ 'bg-blue/20': selected ?? false }"
  >
    <div class="color-white">{{ spot.name }}</div>
    <div>
      總數: {{ spot.total_lots }} / 剩餘車輛: {{ spot.n_currenet_lots }} / 剩餘車位:
      {{ spot.n_empty_lots }}
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Spot } from '@/lib/apis'

defineProps<{
  spot: Spot
  selected?: boolean
}>()
</script>
