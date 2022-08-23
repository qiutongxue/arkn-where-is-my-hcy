<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed, ref } from 'vue'
import { cardURL, orignitePrimeURL, orundumURL } from '../misc/urls'
import state from '../composables/state'
import result from '../composables/result'

const railStyle = ({ checked, focused }: { checked: boolean; focused: boolean }) => {
  const style: CSSProperties = {}
  if (checked) {
    style.background = '#de9c00'
    if (focused)
      style.boxShadow = '0 0 5px 2px #de9c0040'
  }
  else {
    style.background = '#d3151c'
    if (focused)
      style.boxShadow = '0 0 5px 2px #d3151c40'
  }
  return style
}

const showTotalGacha = ref(false)

const countResultAwards = (key: keyof AwardsType) => {
  return result.value
    .map((v) => {
      let value = 0
      v.details.forEach(d => value += d.awards[key] || 0)
      return value
    })
    .reduce((p, c) => p + c, 0)
}

const totalOrundum = computed(() => {
  return state.currentOrundum + countResultAwards('orundum')
})

const totalCard = computed(() => {
  return state.currentCard + countResultAwards('card')
})

const totalOrignitePrime = computed(() => {
  return state.currentOrignitePrime + countResultAwards('orignitePrime')
})
</script>

<template>
  <div>
    <div
      class="results"
      tag="div" name="list"
      relative flex justify-center
    >
      <div :class="showTotalGacha ? 'inactive' : 'active'" relative m-4>
        <img :src="orundumURL" w-20 alt="合成玉">
        <span
          absolute block bottom="1.5" font-bold w="100%"
          text="white shadow-md" bg="gray op-70"
        >
          {{ totalOrundum }}
        </span>
      </div>

      <div key="card" relative m-4>
        <img :src="cardURL" alt="寻访凭证" w="20">
        <span
          absolute block bottom="1.5" font-bold w="100%"
          text="white shadow-md" bg="gray op-70"
        >
          {{ totalCard + (showTotalGacha ? (totalOrundum + 180 * totalOrignitePrime) / 600 | 0 : 0) }}
        </span>
      </div>
      <div :class="showTotalGacha ? 'inactive' : 'active'" relative m-4>
        <img :src="orignitePrimeURL" w-20 alt="至纯源石">
        <span
          absolute block bottom="1.5" font-bold w="100%"
          text="white shadow-md" bg="gray op-70"
        >
          {{ totalOrignitePrime }}
        </span>
      </div>
    </div>

    <n-switch key="switch" v-model:value="showTotalGacha" :rail-style="railStyle">
      <template #checked>
        换算
      </template>
      <template #unchecked>
        合计
      </template>
    </n-switch>
  </div>
</template>

<style scoped>
.results > div {
  transition: .5s ease-in-out;
  position: relative;
}

.inactive {
  opacity: 0;
  transform: translateX(-6rem);
  z-index: -2;
}

.active {
  opacity: 1;;
}

.inactive:nth-child(1) {
  transform: translateX(6rem);
}
</style>
