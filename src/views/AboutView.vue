<template>
  <div class="h-full flex flex-col items-center p-1rem gap-2.5rem">
    <RouterLink to="/" class="shrink-0"
      ><img src="@/assets/logo.png" alt="logo" class="h-[5rem]"
    /></RouterLink>
    <OverlayScrollbarsComponent>
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
    </OverlayScrollbarsComponent>
  </div>
</template>
<script setup lang="tsx">
import SimplePanel from '@/components/SimplePanel.vue'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import { reactive, type Component, type FunctionalComponent } from 'vue'

type Explaination = {
  id: number
  title: string
  opened: boolean
  detail: () => Component
}

const SimplePreWrapText: FunctionalComponent<{}, {}> = (_: {}, { slots }) => {
  return <span class="whitespace-pre-wrap">{slots?.default?.()}</span>
}

// function makePreWrappedText(text: string) {
//   return <span class="whitespace-pre-wrap">{text}</span>
// }

const explainations: Explaination[] = reactive([
  {
    id: 0,
    title: '認識微笑單車',
    opened: false,
    detail: () => (
      <SimplePreWrapText>{`「YouBike 微笑單車」為提供 24H
甲租乙還租賃服務的電子無人自動化管理公共自行車系統，以優質的營運服務、舒適好騎的自行車、方便註冊與使用之特點，鼓勵民眾改變出行習慣，使用大眾運輸系統，降低交通壅塞度，同時能夠環保節能，創造永續智慧交通環境。
多年的營運經驗中，微笑單車不斷與時俱進，為更貼近民眾需求，用心研發出 YouBike 2.0公共自行車高運量系統，採「無電輕樁」設計的停車柱，讓站點設置更靈活；搭載智慧車機提供「一車一機免排隊」服務，提供多元租借方式，方便民眾快速借還車，讓公共自行車深入巷弄，串起最先與最後一哩路，讓出行更為便利。
`}</SimplePreWrapText>
    ),
  },
  {
    id: 1,
    title: 'Ubike協尋',
    opened: false,
    detail: () => (
      <SimplePreWrapText>{`一、公告目的：發動群眾的力量，找回遺失車輛，加速車輛找回，也讓更多人有車可用。
二、公告內容：民眾已報案遺失需協尋車號(每日更新)。
三、如您有發現以下公告遺失車號,請您盡速進電服務電話通報 聯絡電話:04-2369-6922。`}</SimplePreWrapText>
    ),
  },
  {
    id: 2,
    title: '收費方式',
    opened: false,
    detail: () => (
      <SimplePreWrapText>{`1.YouBike 2.0 4 小時內每 30 分鐘 10 4~8 小時內每 30 分鐘 20 元 超過 8 小時每 30 分鐘 40 元未滿 30 分鐘以 30 分鐘計算。
2.YouBike 2.0E 前 2 小時每 30 分鐘 20 超過２小時每 30 分鐘 40元 未滿 30 分鐘以 30 分鐘計算。`}</SimplePreWrapText>
    ),
  },
  {
    id: 3,
    title: '相關法律',
    opened: false,
    detail: () => (
      <SimplePreWrapText>{`1.應確保自身安全騎乘之條件，會員於精神狀態及體能條件不足以安全順利騎乘時，應避免租借或停止租借。
2. 遵守「道路交通管理處罰條例」第三章慢車、「道路交通安全規則」第五章慢車規定。
3.遵守道路交通標誌、標線、號誌之指示，並服從執行交通勤務警察之指揮。`}</SimplePreWrapText>
    ),
  },
])
</script>
