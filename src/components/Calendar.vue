<script setup lang="ts">
import { computed, ref } from 'vue'
import { NButton, NPopover } from 'naive-ui'
import { addDays } from 'date-fns'
import { result } from '../composables/util'
import orundumURL from '../assets/orundum.png'
import cardURL from '../assets/card.png'

const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
const baseDate = ref<Date>(new Date(new Date().setDate(1)))
const tmps = computed(() => {
  const result = []
  const date = new Date(baseDate.value)
  for (let i = 1; i < (date.getDay() || 7); i++) result.push('')
  for (
    let i = date, j = 0, month = baseDate.value.getMonth()
    ; j < 40 && i.getMonth() === month
    ; i = addDays(i, 1), j++
  )
    result.push(i.getDate())
  return result
})

const computedData = computed(() => {
  const maps = [...tmps.value]
  const data = result.value.filter(d =>
    d.date.getFullYear() === baseDate.value.getFullYear()
        && d.date.getMonth() === baseDate.value.getMonth(),
  )
  const res = maps.map((m) => {
    if (!m)
      return null
    const current = data.find(v => v.date.getDate() === m)
    let orundum = 0; let card = 0
    current?.details.forEach((d) => {
      orundum += d.awards.orundum || 0
      card += d.awards.card || 0
    })
    return {
      date: current?.date,
      orundum,
      card,
      details: current?.details,
    }
  })
  return res
})
const addMonth = () => {
  const date = baseDate.value
  baseDate.value = new Date(date.setMonth(date.getMonth() + 1))
}

const subMonth = () => {
  const date = baseDate.value
  baseDate.value = new Date(date.setMonth(date.getMonth() - 1))
}
</script>

<template>
  <div class="p-4">
    <div class="flex gap-4 justify-end">
      <n-button @click="subMonth">
        ←
      </n-button>
      <span class="font-bold text-3xl">{{ baseDate.getFullYear() }}</span>
      <span class="font-bold text-3xl">{{ baseDate.getMonth() + 1 }}</span>
      <n-button @click="addMonth">
        →
      </n-button>
    </div>
    <div class="grid calendar mt-4">
      <div v-for="day in days" :key="day" class=" h-10 flex justify-center items-center">
        {{ day }}
      </div>
      <div v-for="(tmp, idx) in tmps" :key="idx" class="relative min-h-10 flex justify-center items-center p-2">
        <n-popover v-if="tmp && computedData[idx]" trigger="hover">
          <template #trigger>
            <div class="text-xs text-white font-bold">
              <div v-if="computedData[idx]?.orundum" class="relative">
                <img :src="orundumURL" class="calendar-img" alt="">
                <span class="absolute block w-100% bottom-1.5 bg-gray bg-op-70 ">
                  {{ computedData[idx]!.orundum }}
                </span>
              </div>
              <div v-if="computedData[idx]?.card" class="relative">
                <img :src="cardURL" class="calendar-img" alt="">
                <span class="absolute block w-100% bottom-1.5 bg-gray bg-op-70">
                  {{ computedData[idx]!.card }}</span>
              </div>
            </div>
          </template>
          <div class="flex flex-col">
            <div
              v-for="detail in computedData[idx]?.details"
              :key="detail.name"
              class="px-2 py-1 flex justify-center items-center gap-4"
            >
              <span>{{ detail.name }}</span> |
              <div v-if="detail.awards.orundum" class="flex items-center">
                <span class="font-bold px-2 text-red">{{ detail.awards.orundum }}</span>
                <img :src="orundumURL" class="w-6" alt="hcy">
              </div>
              <div v-if="detail.awards.card" class="flex items-center">
                <span class="font-bold px-2 text-amber">{{ detail.awards.card }}</span>
                <img :src="cardURL" class="w-6" alt="gacha">
              </div>
            </div>
            <!-- {{ computedData[idx]?.details }} -->
          </div>
        </n-popover>
        <div class=" absolute text-sm text-gray-300 right-1 bottom-0">
          {{ tmp }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar {
    box-sizing: border-box;
    font-size: 1rem;
    grid-template-columns: repeat(7, 1fr);
    gap: .1em;
    border-top: 1px solid #efeff3;
    border-left: 1px solid #efeff3;
    /* grid-auto-flow: dense; */
}

.calendar>div {
    box-sizing: border-box;
    /* outline: black solid .1em; */
    border-bottom: 1px solid #efeff3;
    border-right: 1px solid #efeff3;
}

.calendar-img {
    max-width: calc((100vw - 30px) / 10);
}

@media screen and (min-width: 960px) {
    .calendar-img {
        max-width: 5rem;
    }
}
</style>
