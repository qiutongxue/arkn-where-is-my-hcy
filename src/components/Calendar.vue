<script setup lang="ts">
import { computed } from 'vue'
import { NButton, NPopover } from 'naive-ui'
import { isToday } from 'date-fns'
import { cardURL, orundumURL } from '../misc/urls'
import { useCalendar } from '../composables/calendar'
import result from '../composables/result'
import { useColor } from '../composables/colors'

const weekHeads = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

const colors = ['#4caf50', '#fb353e', '#4b9cbe', '#9d987b', '#ff9800', '#673ab7', '#1E88E5', '#00ACC1', '#00897B']
const { getRandomColor } = useColor(...colors)

const calendarEvents = computed(() => {
  const events = result.value.reduce<CalendarEvent[]>((events, cur) => {
    const eventsInOneDay = cur.details.map((detail) => {
      const start = detail.start ? new Date(detail.start) : cur.date
      const end = detail.end ? new Date(detail.end) : cur.date
      return {
        start,
        end,
        name: detail.name,
        awards: detail.awards,
        color: getRandomColor(),
      }
    })
    events.push(...eventsInOneDay)
    return events
  }, [])
  return events
})

const { getYear, getMonth, subMonth, addMonth, weeks } = useCalendar(calendarEvents)
</script>

<template>
  <div p="4">
    <div flex="~ gap-4" justify-end>
      <n-button @click="subMonth">
        ←
      </n-button>
      <span font-bold text-3xl>{{ getYear() }}</span>
      <span font-bold text-3xl>{{ getMonth() }}</span>
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
