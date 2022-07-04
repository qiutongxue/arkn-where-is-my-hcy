<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed, ref } from 'vue'
import { cardURL, orundumURL } from '../misc/urls'
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

const countResultAwards = (key: 'orundum' | 'card') => {
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
</script>

<template>
  <div>
    <transition-group
      tag="div" name="list"
      relative flex justify-center
    >
      <div key="orundum" relative>
        <transition name="orundum">
          <div v-show="!showTotalGacha" relative m-4>
            <img :src="orundumURL" w-20 alt="合成玉">
            <span
              absolute block bottom="1.5" font-bold w="100%"
              text="white shadow-md" bg="gray op-70"
            >
              {{ totalOrundum }}
            </span>
          </div>
        </transition>
      </div>
      <div key="idontknow">
        <div key="card" relative m-4>
          <img :src="cardURL" alt="寻访凭证" w="20">
          <span
            absolute block bottom="1.5" font-bold w="100%"
            text="white shadow-md" bg="gray op-70"
          >
            {{ totalCard + (showTotalGacha ? totalOrundum / 600 | 0 : 0) }}
          </span>
        </div>
      </div>
    </transition-group>

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
.list-move,
/* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active,
.orundum-leave-active {
    transition: all .5s ease;
}

/* .list-enter-from {
        opacity: 0;
    } */
.list-enter-from,
.list-leave-to,
.orundum-leave-to {
    position: relative;
    opacity: 0;
    transform: translateX(1.5em);
}

/* 确保将离开的元素从布局流中删除
    以便能够正确地计算移动的动画。 */
.list-leave-active,
.orundum-leave-active {
    position: absolute;
    width: 100%;
}
</style>
