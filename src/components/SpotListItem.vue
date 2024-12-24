<template>
  <div
    class="b-1 b-amber rounded-0.25rem flex flex-col gap0.25rem p-0.25rem hover:bg-white/10 active:bg-white/30 cursor-pointer"
    :class="{
      'bg-blue/20 bg-black!': selected ?? false,
      'sticky top-0 bottom-0': (selected ?? false) && !noSticky,
    }"
    @click="handleClickSpot"
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
import { nextTick, ref } from 'vue'

const noSticky = ref(false)

async function handleClickSpot(event: MouseEvent) {
  noSticky.value = true
  await nextTick() // wait after DOM rendering
  ;(event.target as HTMLDivElement).scrollIntoView({ block: 'center' })
  noSticky.value = false
}

defineProps<{
  spot: Spot
  selected?: boolean
}>()
</script>
