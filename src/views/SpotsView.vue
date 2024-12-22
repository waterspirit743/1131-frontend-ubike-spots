<template>
  <div class="spots-wrapper h-full flex flex-row gap-0.25rem">
    <div class="flex flex-col gap-0.5rem h-full grow py-2rem pl-2rem">
      <header class="flex flex-row">
        <RouterLink to="/" class="shrink-0"
          ><img src="@/assets/logo.png" alt="logo" class="h-[5rem]"
        /></RouterLink>
      </header>
      <div
        class="content grow border-1 border-white/20 border-dashed rounded-0.5rem p-0.25rem relative"
      >
        <Transition mode="in-out" leave-active-class="animate-fade-out animate-duration-300">
          <div
            v-if="spots == null"
            class="backdrop w-full h-full absolute top-0 left-0 z-10000 bg-black/80 flex items-center justify-center"
          >
            <div class="font-size-12rem animate-spin rounded-50% -transform-translate-50%">☯</div>
          </div>
        </Transition>
        <l-map v-model:zoom="zoom" :center="[23.5, 120.0]">
          <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
          />

          <l-marker v-for="spot in spots" :key="spot.name" :lat-lng="spot.location" />
        </l-map>
      </div>
    </div>
    <aside
      class="spots-list-drawer w-30% pr-2rem p-l0.5rem py-2rem flex flex-col gap-0.5rem bg-blue/20"
    >
      <div class="search grow flex flex-row items-center gap-1rem justify-end">
        <input
          type="text"
          class="w-1/2 min-w-15rem rounded-0.5rem outline-none bg-blue/25 p-0.25rem text-white/90"
        />
        <button class="bg-transparent b-1 b-white rounded-[0.5rem] py-0.25rem px-0.75rem">
          Search
        </button>
      </div>

      <OverlayScrollbarsComponent defer>
        <div class="flex flex-col gap-0.25rem">
          <div
            v-for="spot in spots"
            :key="spot.name"
            class="b-1 b-amber rounded-0.25rem flex flex-col gap0.25rem p-0.25rem"
          >
            <div class="color-white">{{ spot.name }}</div>
            <div>
              總數: {{ spot.total_lots }} / 剩餘車輛: {{ spot.n_currenet_lots }} / 剩餘車位:
              {{ spot.n_empty_lots }}
            </div>
          </div>
        </div>
      </OverlayScrollbarsComponent>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import { onMounted, ref } from 'vue'

const zoom = ref(11)

const spots = ref<Spot[]>()

async function fetchUbike(): Promise<Spot[]> {
  const response = await fetch(
    'https://datacenter.taichung.gov.tw/swagger/OpenData/86dfad5c-540c-4479-bb7d-d7439d34eeb1',
  )
  const json: ResponseData = await response.json()
  if (json.retCode !== 1) {
    alert("Can't get data")
    return []
  }
  return json.retVal.map(parseSpot)
}

async function updateSpots() {
  spots.value = await fetchUbike()
}

onMounted(async () => {
  await updateSpots()
})

type Location = {
  lat: number
  lng: number
}

type Spot = {
  name: string
  location: Location
  total_lots: number
  n_empty_lots: number
  n_currenet_lots: number
}

type RawSpot = {
  ar: string // name
  lat: string
  lng: string
  tot: string // total_lots
  sbi: string // n_current_lots
  bemp: string // n_empty_lots
}

type ResponseData = {
  retCode: number
  retVal: RawSpot[]
}

function parseSpot(rawSpot: RawSpot): Spot {
  return {
    name: rawSpot.ar,
    location: {
      lat: parseFloat(rawSpot.lat),
      lng: parseFloat(rawSpot.lng),
    },
    total_lots: parseInt(rawSpot.tot),
    n_currenet_lots: parseInt(rawSpot.sbi),
    n_empty_lots: parseInt(rawSpot.bemp),
  }
}
</script>
