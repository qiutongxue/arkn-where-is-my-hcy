<script setup lang="ts">
import { useDark } from '@vueuse/core'
import { Ref, computed, watch } from 'vue'
import state from '../composables/state'
import GreenShopIcon from '../UI/icons/GreenShopIcon.vue'
import OrundumIcon from '../UI/Icons/OrundumIcon.vue'
import { isDark } from '../composables/dark'

type Keys = keyof Pick<typeof state, 'isGreenStoreLevel1' | 'isGreenStoreLevel2' | 'isProduceOrundum'>
const light = 'white'
const dark = '#555'
const handleFill = (key: Keys) => {
  return computed(() => {
    return state[key] || isDark ? light : dark
  })
}
const greenLevel1 = computed(() => {
  return state.isGreenStoreLevel1 || isDark ? light : dark
})
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
      </div>
    </div>
  </Card>
</template>

<style scoped>

</style>
