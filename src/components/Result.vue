<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed, reactive, ref, watch } from 'vue'
import gsap from 'gsap'
import { capitalize, resultHelper } from '../misc/utils'
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
const convertOrignitePrime = ref(false)

const countResultAwards = (key: keyof AwardsType) => {
  return result.value
    .map((v) => {
      let value = 0
      v.details.forEach(d => value += d.awards[key] || 0)
      return value
    })
    .reduce((p, c) => p + c, 0)
}

const mapper = resultHelper.map((r) => {
  const name = r.name
  const total = computed(() => {
    const result = state[`current${capitalize(name)}`] + countResultAwards(name)
    return result
  })

  const display = computed(() => {
    let result = total.value
    if (name === 'card' && showTotalGacha.value) {
      let orundums = mapper[0].total.value
      if (convertOrignitePrime.value)
        orundums += mapper[2].total.value * 180
      result += orundums / 600 | 0
    }
    if (name === 'orundum' && showTotalGacha.value)
      result = 0

    if (name === 'orignitePrime' && showTotalGacha.value && convertOrignitePrime.value)
      result = 0

    return result
  })

  const tweened = reactive({ number: 0 })
  watch(display, n => gsap.to(tweened, { duration: 0.5, number: n, delay: 0.5 }), { immediate: true })

  let show = computed(() => true)
  if (name === 'orundum')
    show = computed(() => !showTotalGacha.value)
  if (name === 'orignitePrime') {
    show = computed(() => {
      return !showTotalGacha.value || !convertOrignitePrime.value
    })
  }

  return { ...r, total, show, tweened, display }
})

// const transitionAfterLeaveBeforeEnter = (el: Element) => {
//   (el as HTMLElement).style.top = ''
//   ;(el as HTMLElement).style.left = ''
//   ;(el as HTMLElement).style.width = ''
// }

// const transitionBeforeLeave = (el: Element) => {
//   const elRect = el.getBoundingClientRect()
//   const paRect = el.parentElement?.getBoundingClientRect() || { top: 0, left: 0 }
//   const left = elRect.left - paRect.left
//   const top = elRect.top - paRect.top
//   const width = elRect.width

//   ;(el as HTMLElement).style.top = `${top}px`
//   ;(el as HTMLElement).style.left = `${left}px`
//   ;(el as HTMLElement).style.width = `${width}px`
// }
</script>

<template>
  <div flex flex-col justify-center items-center>
    <TransitionGroup
      class="awards-result"
      tag="div" name="awards-result-transition"
      relative flex justify-center pt-4
    >
      <div v-for="m in mapper" v-show="m.show.value" :key="m.name" m-4 mt-0 relative>
        <img :src="m.img" :alt="m.alt" w-20>
        <span
          absolute block bottom="1.5" font-bold w="100%"
          text="white shadow-md" bg="gray op-70"
        >
          {{ m.tweened.number.toFixed(0) }}
        </span>
      </div>
    </TransitionGroup>

    <n-switch key="switch" v-model:value="showTotalGacha" :rail-style="railStyle">
      <template #checked>
        换算
      </template>
      <template #unchecked>
        合计
      </template>
    </n-switch>
    <n-checkbox v-model:checked="convertOrignitePrime" mt-4>
      用源石抽卡
    </n-checkbox>
  </div>
</template>

<style scoped>
.awards-result-transition-enter-from,
.awards-result-transition-leave-to {
  opacity: 0 !important;
}

.awards-result-transition-move,
.awards-result-transition-enter-active,
.awards-result-transition-leave-active {
  transition: .5s ease;
  /* transition-delay: .5s; */
}
.awards-result-transition-leave-active {
  position: absolute !important;
}

.awards-result-transition-enter-from {
  transition-property: opacity !important;
    /* transition-delay: .5s; */
  transform: translateX(-100%)
}

.awards-result-transition-enter-from:nth-child(1) {
  transform: translateX(100%);
}
</style>
