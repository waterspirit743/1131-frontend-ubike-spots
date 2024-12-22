<template>
  <div class="h-full flex flex-col items-center p-1rem gap-2.5rem">
    <RouterLink to="/" class="shrink-0"
      ><img src="@/assets/logo.png" alt="logo" class="h-[5rem]"
    /></RouterLink>
    <div class="flex flex-col items-center gap-0.75rem">
      <SimplePanel
        v-for="e in explainations"
        :key="e.id"
        :title="e.title"
        v-model:opened="e.opened"
      >
        <component :is="e.detail" />
      </SimplePanel>
    </div>
  </div>
</template>
<script setup lang="tsx">
import SimplePanel from '@/components/SimplePanel.vue'
import { reactive, type Component } from 'vue'

type Explaination = {
  id: number
  title: string
  opened: boolean
  detail: () => Component
}

const explainations: Explaination[] = reactive([
  {
    id: 0,
    title: '認識微笑單車',
    opened: false,
    detail: () => <span>abc</span>,
  },
  {
    id: 1,
    title: 'Ubike協尋',
    opened: false,
    detail: () => <span>abc</span>,
  },
  {
    id: 2,
    title: '收費方式',
    opened: false,
    detail: () => <span>abc</span>,
  },
  {
    id: 3,
    title: '相關法律',
    opened: false,
    detail: () => <span>abc</span>,
  },
])
</script>
