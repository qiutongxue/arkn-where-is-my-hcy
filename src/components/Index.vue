<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed, ref, toRefs, watchEffect } from 'vue'
import {
  NCard,
  NCheckbox,
  NCollapse,
  NCollapseItem,
  NDatePicker,
  NDivider,
  NModal,
  NRadioButton,
  NRadioGroup,
  NSelect,
  NSwitch,
} from 'naive-ui'
import { useToggle } from '@vueuse/core'
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

const [showRules, toggleShowRules] = useToggle(false)
</script>

<template>
  <div
    text="4xl"
    p="x-4 t-4"
    m="4"
    font="bold"
  >
    我合成玉呢
  </div>
  <div flex items-center text="#aaa">
    <span><strong>粗略</strong>计算抽卡次数</span>
    <div
      m="l-1"
      w="4"
      h="4"
      i-ri:question-fill
      @click="() => toggleShowRules()"
    />
    <NModal v-model:show="showRules">
      <n-card
        w="80%"
        title="计算规则"
      >
        <span>当前统计</span>
        <li>日常任务：从【任务】中领取的合成玉，100/天</li>
        <li>周常任务：同上，500/周</li>
        <li>Side Story：【活动商店】兑换 3 抽 | 复刻时【紫票商店】兑换 2000 合成玉</li>
        <li>搓玉：按每天 200 合成玉算，不计算额外体力</li>
        <li>月卡：200 合成玉</li>
        <li>绿票商店：默认全部换满，一层 2 抽 + 600 合成玉 | 二层 2 抽</li>
        <li>剿灭任务：默认打满，1800合成玉/周 | 新剿灭额外 1500 合成玉</li>
        <li>签到：每个月第 17 天签到送 1 抽</li>
        <li>故事集：是否有合成玉 or 抽</li>
        <br>
        <span>暂时没统计的</span>
        <li>黄票商店：换满 38 抽</li>
        <li>源石换算：因人而异</li>
        <li>大月卡：每月 10 抽</li>
        <li>邮件送的：太复杂了，不考虑</li>
      </n-card>
    </NModal>
  </div>
  <transition-group tag="div" name="list">
    <arkn-input
      key="orundumInput"
      v-model:value="currentOrundum"
      :img-src="orundumURL" title="合成玉" placeholder="你有多少"
      m="y-4"
    />
    <arkn-input
      key="cardInput"
      v-model:value="currentCard"
      :img-src="cardURL" title="寻访凭证" placeholder="你有多少"
      m="y-4"
    />
    <Card
      key="primeCard" title="月卡"
      p="y-5"
      m="y-5"
    >
      <div flex justify-end>
        <n-switch
          v-model:value="hasPrimeAccess"
          m="r-4"
        />
      </div>
      <div
        v-if="hasPrimeAccess"
        m="t-8"
        p="x-4"
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
          <div
            flex="~ gap-4"
            items-center
            p="y-2"
          >
            <div
              w="10"
              font="bold"
              text="lg"
            >
              开始
            </div>
            <div flex-1>
              <n-date-picker
                v-model:value="primeAccessStart"
                :disabled="!hasPrimeAccess || !!followComputeRange" :is-date-disabled="isDateDisabled"
              />
            </div>
          </div>
          <div
            flex="~ gap-4"
            items-center
            p="y-2"
          >
            <div
              w="10"
              font="bold"
              text="lg"
            >
              结束
            </div>
            <div flex-1>
              <n-date-picker
                v-model:value="primeAccessEnd"
                :disabled="!hasPrimeAccess || !!followComputeRange" :is-date-disabled="isDateDisabled"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>

    <Card
      key="choseCard" title="可选"
      p="y-5"
      m="y-5"
    >
      <div ml-40>
        <div
          flex="~ 1 wrap"
          p="r-4"
          justify-end
        >
          <n-checkbox
            v-model:checked="isGreenStoreLevel1"
            w="auto"
          >
            绿票商店【1】
          </n-checkbox>
          <n-checkbox
            v-model:checked="isGreenStoreLevel2"
            w="auto"
          >
            绿票商店【2】
          </n-checkbox>
          <n-checkbox
            v-model:checked="isProduceOrundum"
            w="auto"
          >
            搓玉(200/天)
          </n-checkbox>
        </div>
      </div>
    </Card>

    <Card
      key="computeCard" title="计算"
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
            <n-date-picker v-model:value="rangeStart" :is-date-disabled="isDateDisabled" />
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
              v-model:value="rangeEnd" :options="selectOptions"
              :consistent-menu-width="false" :fallback-option="handleSelectFallback" placeholder="选择活动"
            />

            <n-date-picker v-model:value="rangeEnd" />
          </div>
        </div>
      </div>
    </Card>

    <n-divider key="divider" />
    <transition-group
      key="transitionGroup1" tag="div" name="list"
      relative
      flex
      justify-center
    >
      <div key="orundum" relative>
        <transition name="orundum">
          <div
            v-show="!showTotalGacha"
            relative m-4
          >
            <img :src="orundumURL" w-20 alt="合成玉">
            <span
              absolute
              block
              bottom="1.5"
              text="white shadow-md"
              bg="gray op-70"
              w="100%"
              font="bold"
            >
              {{ totalOrundum }}
            </span>
          </div>
        </transition>
      </div>
      <div key="idontknow">
        <div
          key="card"
          relative
          m="4"
        >
          <img
            :src="cardURL" alt="寻访凭证"
            w="20"
          >
          <span
            absolute
            block
            bottom="1.5"
            text="white shadow-md"
            bg="gray op-70"
            w="100%"
            font-bold
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

    <n-collapse key="collapse" mt-10>
      <n-collapse-item title="详细信息">
        <transition-group
          v-if="Object.keys(detailInfo).length" tag="div" name="list"
          relative
        >
          <div
            v-for="detail in Object.keys(detailInfo)" :key="detail"
            flex="~ gap-4" justify-center items-center m-2
          >
            <span font-bold text-xl>
              {{ detail }}
            </span>
            <div
              v-show="detailInfo[detail].orundum"
              flex="~ gap-1"
              text="xl red"
              items-center font-bold
            >
              {{ detailInfo[detail].orundum }}
              <img :src="orundumURL" alt="合成玉" w-8>
            </div>
            <div
              v-show="detailInfo[detail].card"
              flex="~ gap-1"
              text="xl amber"
              items-center font-bold
            >
              {{ detailInfo[detail].card }}
              <img :src="cardURL" alt="寻访凭证" w-8>
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
    <div key="footTag" text-gray flex justify-end>
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
