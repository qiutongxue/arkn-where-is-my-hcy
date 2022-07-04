<script setup lang="ts">
import { computed } from 'vue'
import { isDateDisabled } from '../misc/utils'
import events from '../composables/events'
import state from '../composables/state'

const selectOptions = computed(() => {
  return events.parts.map((event) => {
    return {
      label: event.name,
      value: new Date(event.end!).getTime(),
    }
  }).filter(({ value }) => value >= Date.now())
})

const handleSelectFallback = (value: number | string) => {
  return {
    label: '自定义',
    value,
  }
}
</script>

<template>
  <Card
    title="计算"
    p="y-4"
    m="y-4"
  >
    <div
      m="t-12"
      p="x-4"
    >
      <div
        flex="~ gap-4"
        items-center
        p="y-2"
      >
        <div w-10 font-bold text-lg>
          开始
        </div>
        <div flex-1>
          <n-date-picker v-model:value="state.rangeStart" :is-date-disabled="isDateDisabled" />
        </div>
      </div>
      <div
        flex="~ gap-4"
        items-center
        p="y-2"
      >
        <div w-10 font-bold text="lg red">
          结束
        </div>
        <div flex-1>
          <n-select
            v-model:value="state.rangeEnd" :options="selectOptions"
            :consistent-menu-width="false" :fallback-option="handleSelectFallback" placeholder="选择活动"
          />

          <n-date-picker v-model:value="state.rangeEnd" />
        </div>
      </div>
    </div>
  </Card>
</template>

<style scoped>

</style>
