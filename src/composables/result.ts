import { computed } from 'vue'
import { addDays, isFirstDayOfMonth, isMonday } from 'date-fns'
import { formatDate } from '../misc/utils'
import events from './events'
import state from './state'

const eventsMap = {} as Record<keyof typeof events, ArknEvent[]>
const entries = Object.entries(events) as unknown as ([keyof typeof events, ArknEvent[]])[]
entries.forEach(([key, value]) => {
  eventsMap[key] = value.map((oriEvent) => {
    const { required, start } = oriEvent
    const event = { ...oriEvent }

    if (key === 'parts')
      event.required = (date?: Date) => !!start && !!date && date.toDateString() === new Date(start).toDateString()

    else if (!required)
      event.required = () => true

    return event
  })
})

const addToDetails = (
  events: ArknEvent[],
  t: { details: ArknEvent[] },
  d: Date,
) => {
  events.forEach((event) => {
    if (event.required && event.required(d))
      t.details.push(event)
  })
}

const partsStartTimeSet = new Set(events.parts.map(event => formatDate(new Date(event.start!))))

const result = computed(() => {
  const res = []
  const startDate = new Date(state.rangeStart); const endDate = new Date(state.rangeEnd)
  for (let d = startDate; d <= endDate; d = addDays(d, 1)) {
    const t = {
      date: new Date(d),
      details: [] as ArknEvent[],
    }

    addToDetails(eventsMap.daily, t, d) // 每日奖励

    if (isMonday(d)) { // 周奖励
      addToDetails(eventsMap.weekly, t, d)
    }
    if (isFirstDayOfMonth(d)) { // 月奖励
      addToDetails(eventsMap.monthly, t, d)
    }
    if (partsStartTimeSet.has(formatDate(d))) { // 活动奖励
      addToDetails(eventsMap.parts, t, d)
    }
    res.push(t)
  }
  return res
})

export default result
