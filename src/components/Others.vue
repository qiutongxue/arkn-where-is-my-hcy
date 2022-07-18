<script setup lang="ts">
import state from '../composables/state'
import { isDark } from '../composables/dark'
import YellowShopIcon from '../UI/Icons/YellowShopIcon.vue'

type Keys = keyof Pick<typeof state, 'isGreenStoreLevel1' | 'isGreenStoreLevel2' | 'isProduceOrundum'>
const light = 'white'
const dark = '#555'
</script>

<template>
  <Card
    title="可选"
    p="y-5"
    m="y-5"
  >
    <div mt-14 px-4>
      <div
        flex="~ wrap gap-4"
        justify-evenly
        p="4"
      >
        <ArknCheckbox
          v-model:checked="state.isGreenStoreLevel1"
          w="60"
        >
          <template #icon>
            <GreenShopIcon
              :level="1" s-15
              :fill="state.isGreenStoreLevel1 || isDark ? light : dark"
            />
          </template>
          绿票商店一层
        </ArknCheckbox>
        <ArknCheckbox
          v-model:checked="state.isGreenStoreLevel2"
          w="60"
        >
          <template #icon>
            <GreenShopIcon
              :level="2" s-15
              :fill="state.isGreenStoreLevel2 || isDark ? light : dark"
            />
          </template>
          绿票商店二层
        </ArknCheckbox>
        <ArknCheckbox
          v-model:checked="state.isProduceOrundum"
          w="60"
        >
          <template #icon>
            <OrundumIcon
              s-15
              :fill="state.isProduceOrundum || isDark ? light : dark"
            />
          </template>
          搓玉(200/天)
        </ArknCheckbox>
        <ArknCheckbox
          v-model:checked="state.isYellowStore"
          w="60"
        >
          <template #icon>
            <YellowShopIcon
              s-15
              :fill="state.isYellowStore || isDark ? light : dark"
            />
          </template>
          黄票商店（兑换一次）
        </ArknCheckbox>
      </div>
    </div>
  </Card>
</template>

<style scoped>

</style>
