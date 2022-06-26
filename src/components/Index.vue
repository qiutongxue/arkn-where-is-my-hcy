<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed, ref, toRefs, watchEffect } from 'vue'
import {
  NCheckbox,
  NCollapse,
  NCollapseItem,
  NDatePicker,
  NDivider,
  NRadioButton,
  NRadioGroup,
  NSelect,
  NSwitch,
} from 'naive-ui'
import orundumURL from '../assets/orundum.png'
import cardURL from '../assets/card.png'
import {
  result, state,
} from '../composables/util'
import events from '../composables/events'
import ArknInput from '../UI/ArknInput.vue'
import Card from '../UI/Card.vue'
import Calendar from './Calendar.vue'

const {
  hasPrimeAccess, primeAccessStart, primeAccessEnd,
  rangeStart, rangeEnd,
  currentOrundum, currentCard,
  isGreenStoreLevel1, isGreenStoreLevel2, isProduceOrundum,
} = toRefs(state)

const isDateDisabled = (date: number) => {
  return date < (new Date().setDate(new Date().getDate() - 1))
}

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
  return currentOrundum.value + countResultAwards('orundum')
})

const totalCard = computed(() => {
  return currentCard.value + countResultAwards('card')
})

const detailInfo = computed(() => {
  const details: Record<string, {
    orundum: number
    card: number
  }> = {}
  const value = result.value
  value.forEach((v) => {
    v.details.forEach((d) => {
      const name = d.name; const awards = d.awards
      const detail = details[name] || (details[name] = { orundum: 0, card: 0 })
      detail.orundum += awards.orundum || 0
      detail.card += awards.card || 0
    })
  })
  return details
})

const followComputeRange = ref(1)

watchEffect(() => {
  if (followComputeRange.value) {
    primeAccessStart.value = rangeStart.value
    primeAccessEnd.value = rangeEnd.value
  }
})
</script>

<template>
  <transition-group tag="div" name="list">
    <arkn-input key="orundumInput" v-model:value="currentOrundum" class="my-4" :img-src="orundumURL" title="合成玉" placeholder="你有多少" />
    <arkn-input key="cardInput" v-model:value="currentCard" class="my-4" :img-src="cardURL" title="寻访凭证" placeholder="你有多少" />
    <Card key="primeCard" title="月卡" class="py-5 my-5">
      <div class="flex justify-end">
        <n-switch v-model:value="hasPrimeAccess" class="mr-4" />
      </div>
      <div v-if="hasPrimeAccess" class="mt-8 px-4">
        <n-radio-group v-model:value="followComputeRange" class="flex" size="large">
          <n-radio-button :value="1" class="flex-1">
            月卡拉满~
          </n-radio-button>
          <n-radio-button :value="0" class="flex-1">
            自定义
          </n-radio-button>
        </n-radio-group>
        <div class="mt-4">
          <div class="flex gap-4 items-center py-2 text-#555">
            <div class="w-10 font-bold text-lg">
              开始
            </div>
            <div class="flex-1">
              <n-date-picker
                v-model:value="primeAccessStart"
                :disabled="!hasPrimeAccess || !!followComputeRange" :is-date-disabled="isDateDisabled"
              />
            </div>
          </div>
          <div class="flex gap-4 items-center py-2 text-#555">
            <div class="w-10 font-bold text-lg">
              结束
            </div>
            <div class="flex-1">
              <n-date-picker
                v-model:value="primeAccessEnd"
                :disabled="!hasPrimeAccess || !!followComputeRange" :is-date-disabled="isDateDisabled"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>

    <Card key="choseCard" title="可选" class="py-5 my-5">
      <div class="ml-40">
        <div class="flex-1 flex flex-wrap justify-end pr-4">
          <n-checkbox v-model:checked="isGreenStoreLevel1" class="w-auto">
            绿票商店【1】
          </n-checkbox>
          <n-checkbox v-model:checked="isGreenStoreLevel2" class="w-auto">
            绿票商店【2】
          </n-checkbox>
          <n-checkbox v-model:checked="isProduceOrundum" class="w-auto">
            搓玉(200/天)
          </n-checkbox>
        </div>
      </div>
    </Card>

    <Card key="computeCard" title="计算" class="py-4 my-4">
      <div class="mt-12 px-4">
        <div class="flex gap-4 items-center py-2 text-#555">
          <div class="w-10 font-bold text-lg">
            开始
          </div>
          <div class="flex-1">
            <n-date-picker v-model:value="rangeStart" :is-date-disabled="isDateDisabled" />
          </div>
        </div>
        <div class="flex gap-4 items-center py-2 text-#555">
          <div class="w-10 font-bold text-lg text-red">
            结束
          </div>
          <div class="flex-1">
            <n-select
              v-model:value="rangeEnd" :options="selectOptions"
              :consistent-menu-width="false" :fallback-option="handleSelectFallback" placeholder="选择活动"
            />

            <n-date-picker v-model:value="rangeEnd" />
          </div>
        </div>
      </div>
    </Card>

    <n-divider key="divider" />
    <transition-group key="transitionGroup1" tag="div" name="list" class="relative flex justify-center">
      <div key="orundum" class="relative">
        <transition name="orundum">
          <div v-show="!showTotalGacha" class="relative m-4 ">
            <img :src="orundumURL" class="w-20" alt="">
            <span
              class=" absolute block bottom-1.5 text-white text-shadow-md font-bold bg-gray w-100% bg-op-70"
            >
              {{ totalOrundum }}
            </span>
          </div>
        </transition>
      </div>
      <div key="idontknow">
        <div key="card" class="relative m-4">
          <img :src="cardURL" class="w-20" alt="">
          <span
            class=" absolute block bottom-1.5 text-white text-shadow-md font-bold bg-gray w-100% bg-op-70"
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

    <n-collapse key="collapse" class="mt-10">
      <n-collapse-item title="详细信息">
        <transition-group v-if="Object.keys(detailInfo).length" tag="div" name="list" class="relative">
          <div
            v-for="detail in Object.keys(detailInfo)" :key="detail"
            class="flex justify-center items-center gap-4 m-2"
          >
            <span class="font-bold text-xl">
              {{ detail }}
            </span>
            <div
              v-show="detailInfo[detail].orundum"
              class="flex items-center gap-1 font-bold text-xl text-red"
            >
              {{ detailInfo[detail].orundum }}
              <img :src="orundumURL" class="w-8" alt="">
            </div>
            <div
              v-show="detailInfo[detail].card"
              class="flex items-center gap-1 font-bold text-xl text-amber"
            >
              {{ detailInfo[detail].card }}
              <img :src="cardURL" class="w-8" alt="">
            </div>
          </div>
        </transition-group>
        <div v-else>
          还没开始计算哦
        </div>
      </n-collapse-item>
      <n-collapse-item title="日历">
        <Calendar />
      </n-collapse-item>
    </n-collapse>
    <div key="footTag" class="text-gray flex justify-end">
      注：活动时间是我瞎猜的
    </div>
  </transition-group>
</template>

<style scoped>
.input-number-img {
    transform: translateY(.5em);
}

.user-info {
    grid-template-columns: 1fr 1fr;
}

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

/* .list-leave-from {
    position: relative
} */
</style>
