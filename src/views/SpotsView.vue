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

        <!-- prettier-ignore-attribute :center -->
        <l-map v-model:zoom="zoom" :center="(center as any)">
          <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
          />

          <l-marker
            v-for="spot in spots"
            :key="spot.name"
            :lat-lng="spot.location"
            :icon="selectedSpot === spot ? icon : defaultIcon"
          />
        </l-map>
      </div>
    </div>
    <aside
      class="spots-list-drawer w-30% min-w-23.5rem pr-2rem p-l0.5rem py-2rem flex flex-col gap-0.5rem bg-blue/20"
    >
      <div class="search flex flex-row items-center gap-1rem justify-end">
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
          <SpotListItem
            v-for="spot in spots"
            :key="spot.name"
            :spot="spot"
            :selected="spot === selectedSpot"
            @click="handleSelectSpot(spot)"
          >
          </SpotListItem>
        </div>
      </OverlayScrollbarsComponent>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { fetchUbike, type Spot } from '@/lib/apis'
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import SpotListItem from '@/components/SpotListItem.vue'
import { onMounted, ref } from 'vue'
import { Icon } from 'leaflet'

const zoom = ref(11)

const center = ref({ lat: 23.5, lng: 120.0 })

const selectedSpot = ref<Spot>()

const spots = ref<Spot[]>()

const icon = new Icon.Default({ className: 'select-spot-marker' }) as Icon
const defaultIcon = new Icon.Default() as Icon

function handleSelectSpot(spot?: Spot) {
  if (spot == null) {
    selectedSpot.value = undefined
    return
  }

  center.value = spot.location
  zoom.value = 20
  selectedSpot.value = spot
}

async function updateSpots() {
  spots.value = await fetchUbike()
  handleSelectSpot(spots.value[0])
}

onMounted(async () => {
  await updateSpots()
})
</script>

<style scoped>
:deep(.select-spot-marker) {
  filter: hue-rotate(90deg);
}
</style>
