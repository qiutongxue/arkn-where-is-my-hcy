<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { isDateDisabled } from '../misc/utils'
import state from '../composables/state'

const followComputeRange = ref(1)

watchEffect(() => {
  if (followComputeRange.value) {
    state.primeAccessStart = state.rangeStart
    state.primeAccessEnd = state.rangeEnd
  }
})
</script>

<template>
  <Card title="月卡" p="y-5" m="y-5">
    <div flex justify-end>
      <n-switch
        v-model:value="state.hasPrimeAccess"
        m="r-4"
      />
    </div>
    <div
      v-if="state.hasPrimeAccess"
      m="t-8" p="x-4"
    >
      <n-radio-group v-model:value="followComputeRange" size="large" flex>
        <n-radio-button :value="1" flex="1">
          月卡拉满~
        </n-radio-button>
        <n-radio-button :value="0" flex="1">
          自定义
        </n-radio-button>
      </n-radio-group>
      <div m="t-4">
        <div flex="~ gap-4" items-center p="y-2">
          <div w="10" font="bold" text="lg">
            开始
          </div>
          <div flex-1>
            <n-date-picker
              v-model:value="state.primeAccessStart"
              :disabled="!state.hasPrimeAccess || !!followComputeRange"
              :is-date-disabled="isDateDisabled"
            />
          </div>
        </div>
        <div flex="~ gap-4" items-center p="y-2">
          <div w="10" font="bold" text="lg">
            结束
          </div>
          <div flex-1>
            <n-date-picker
              v-model:value="state.primeAccessEnd"
              :disabled="!state.hasPrimeAccess || !!followComputeRange"
              :is-date-disabled="isDateDisabled"
            />
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>

<style scoped>

</style>
