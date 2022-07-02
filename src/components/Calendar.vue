<script setup lang="ts">
import { computed, ref } from 'vue'
import { NButton, NPopover } from 'naive-ui'
import {
  addDays, addMonths, addWeeks, endOfMonth, endOfWeek,
  getWeeksInMonth, isToday, startOfMonth, startOfWeek, subMonths,
} from 'date-fns'
import { result } from '../composables/util'
import orundumURL from '../assets/orundum.png'
import cardURL from '../assets/card.png'

const getDateId = (date: Date) => {
  return (date.getFullYear() * 10000) + (date.getMonth() * 100) + date.getDate()
}

interface CalendarEvent {
  start: Date
  end: Date
  name: string
  awards: {
    orundum?: number
    card?: number
  }
  color: string
  width?: number
  isEmpty?: boolean
}

interface DayType {
  date: Date
  out: boolean
  events: CalendarEvent[]
}

const colors = ['#4caf50', '#fb353e', '#4b9cbe', '#9d987b', '#ff9800',
  '#673ab7', '#1E88E5', '#00ACC1', '#00897B']

const getColor = () => {
  return colors[Math.random() * colors.length | 0]
}

const events = computed(() => {
  const events = result.value.reduce<CalendarEvent[]>((events, cur) => {
    const eventsInOneDay = cur.details.map((detail) => {
      const start = detail.start ? new Date(detail.start) : cur.date
      const end = detail.end ? new Date(detail.end) : cur.date
      return {
        start,
        end,
        name: detail.name,
        awards: detail.awards,
        color: getColor(),
      }
    })
    events.push(...eventsInOneDay)
    return events
  }, [])
  return events
})

const weekHeads = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
const baseDate = ref<Date>(startOfMonth(Date.now()))

function checkRecentEventFromIndex(week: DayType[], day: Date, idx: number) {
  for (let i = (day.getDay() + 5) % 7; i >= 0; i--) {
    if (!week[i] || week[i].events.length - 1 < idx || week[i].events[idx].isEmpty)
      continue

    const recent = week[i].events[idx]
    return recent.end >= day
  }
  return false
}

const getEvents = (day: Date, week: DayType[]) => {
  const dayId = getDateId(day)
  const result = events.value.filter(e => getDateId(e.start) === dayId
  || (day.getDay() === 1 && e.start <= day && day <= e.end))
  const res: CalendarEvent[] = []
  // if (day.getDay() > 1) {
  result.forEach((r) => {
    while (checkRecentEventFromIndex(week, day, res.length)) {
      res.push({
        ...r,
        name: '',
        color: 'transparent',
        isEmpty: true,
      })
    }
    res.push(r)
  })
  // }
  // else {
  //   res.push(...result)
  // }

  return res.map((e) => {
    let width = 90
    for (let i = addDays(day, 1), last = endOfWeek(day, { weekStartsOn: 1 }); i <= e.end && i <= last; i = addDays(i, 1))
      width += 100
    return {
      ...e,
      width,
    }
  })
  // return result
}

const weeks = computed(() => {
  const weeksCount = getWeeksInMonth(baseDate.value, { weekStartsOn: 1 })
  const firstDayOfMonth = startOfMonth(baseDate.value)
  const lastDayOfMonth = endOfMonth(baseDate.value)
  const result = []
  for (let i = 0, date = baseDate.value; i < weeksCount; i++, date = addWeeks(date, 1)) {
    const start = startOfWeek(date, { weekStartsOn: 1 })
    const end = endOfWeek(date, { weekStartsOn: 1 })
    const week: DayType[] = []
    for (let d = start; d <= end; d = addDays(d, 1)) {
      const events = getEvents(d, week)
      week.push({
        date: d,
        out: d < firstDayOfMonth || d > lastDayOfMonth,
        events,
      })
    }
    result.push(week)
  }
  return result
})

const addMonth = () => {
  const date = baseDate.value
  baseDate.value = addMonths(date, 1)
}

const subMonth = () => {
  const date = baseDate.value
  baseDate.value = subMonths(date, 1)
}
</script>

<template>
  <div p="4">
    <div flex="~ gap-4" justify-end>
      <n-button @click="subMonth">
        ←
      </n-button>
      <span font-bold text-3xl>{{ baseDate.getFullYear() }}</span>
      <span font-bold text-3xl>{{ baseDate.getMonth() + 1 }}</span>
      <n-button @click="addMonth">
        →
      </n-button>
    </div>

    <div
      box-border
      overflow-hidden
      text="4"
      flex="~ col"
      m="t-4"
      w="100%"
      h="100%"
    >
      <div flex>
        <div
          v-for="weekHead in weekHeads"
          :key="weekHead"
          flex="1"
        >
          {{ weekHead }}
        </div>
      </div>
      <div
        v-for="week, idx in weeks" :key="idx"
        flex
      >
        <div
          v-for="day in week"
          :key="day.date.getTime()"
          :bg="day.out ? '#efeff3 dark:#343434' : ''"
          :text="day.out ? '#aeaeae' : ''"
          flex="1"
        >
          <span
            :class="isToday(day.date) ? 'today' : ''"
            block p-2 m-2
          >{{ day.date.getDate() }}</span>
          <template v-if="!day.out">
            <n-popover v-for="event in day.events" :key="event.name">
              <template #trigger>
                <div
                  class="event dark:op-70" :class="[event.isEmpty ? 'empty-event' : '']"
                  :style="{ width: `${event.width}%`, height: '21px', backgroundColor: event.color }"
                >
                  {{ event.name }}
                </div>
              </template>
              <div text-center>
                {{ event.name }}
              </div>
              <div
                flex="~ gap-4"
                justify-center items-center
              >
                <div
                  v-if="event.awards.orundum"
                  flex="~ gap-2"
                  justify-center items-center
                >
                  <img :src="orundumURL" alt="合成玉" w-10>
                  <span font="bold" text="red">{{ event.awards.orundum }}</span>
                </div>
                <div
                  v-if="event.awards.card"
                  flex="~ gap-2"
                  justify-center items-center
                >
                  <img :src="cardURL" alt="寻访凭证" w-10>
                  <span font="bold" text="amber">{{ event.awards.card }}</span>
                </div>
                <span v-if="!event.awards.orundum && !event.awards.card">好像什么都拿不到诶</span>
              </div>
            </n-popover>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar-img {
    max-width: calc((100vw - 30px) / 10);
}

.outday {
  background: #efeff3;
  color: #aeaeae;
}

.today {
  /* font-weight: bold; */
  background: #2a73c5;
  /* border-radius: 50%; */
  color: white;
  font-weight: bold;
}

.event {
  /* display: flex; */
  overflow: hidden;
  text-overflow: ellipsis;
  /* white-space: nowrap; */
  justify-content: start;
  align-items: center;
  font-size: small;
  text-align: left;
  border-radius: 5px;
  color: white;
  margin-top: 1px;
  padding-left: 3px;
  cursor: pointer;
  position: relative;
  z-index: 1;
  transition: all .5s;
  opacity: 1

}

.event:hover {
  opacity: .8;
}

.empty-event {
  z-index: -1;
}

@media screen and (min-width: 960px) {
    .calendar-img {
        max-width: 5rem;
    }
}
</style>
