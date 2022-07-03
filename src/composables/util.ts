import { computed, reactive } from 'vue'
import { addDays, isFirstDayOfMonth, isMonday } from 'date-fns'
import events from './events'

const state = reactive({
  isGreenStoreLevel1: true,
  isGreenStoreLevel2: true,
  hasPrimeAccess: false,
  primeAccessStart: Date.now(),
  primeAccessEnd: Date.now(),
  rangeStart: Date.now(),
  rangeEnd: Date.now(),
  currentOrundum: 0,
  currentCard: 0,
  isProduceOrundum: false,
})

// const requires: Record<ParsedRequires, Function> & ThisType<Event> = {
//   prime(date: Date) {
//     return !!date && isPrimeAccess(date)
//   },
//   orundumProd() {
//     return state.isProduceOrundum
//   },
//   sign17(date: Date) {
//     return !!date && date.getDate() === 17
//   },
//   equalStart(start: string, date: Date): boolean {
//     return date!.toDateString() === new Date(start).toDateString()
//   },
//   greenStoreLevel(level: 1 | 2) {
//     return state[`isGreenStoreLevel${level}`]
//   },
// }

const eventsMap = {} as Record<keyof typeof events, ArknEvent[]>
const entries = Object.entries(events) as unknown as ([keyof typeof events, ArknEvent[]])[]
entries.forEach(([key, value]) => {
  eventsMap[key] = value.map((event) => {
    const { required, start } = event
    if (key === 'parts') {
      return {
        ...event,
        required: (date?: Date) => !!start && !!date && date.toDateString() === new Date(start).toDateString(),
      }
    }
    if (!required) {
      return {
        ...event,
        required: () => true,
      }
    }
    return {
      ...event,
    }
    // const arr = required.split(':')
    // const fnName = arr[0] as ParsedRequires; const args = arr.slice(1)
    // if (start)
    //   args.push(start)

    // const rfn = function (date: Date) {
    //   return requires[fnName].apply(event, [...args, date])
    // }
  })
})

const addToDetails = (events: ArknEvent[], t: { details: ArknEvent[] }, d: Date) => {
  events.forEach((event) => {
    if (event.required && event.required(d))
      t.details.push(event)
  })
}

const formatDate = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

const partsStartTimeSet = new Set(events.parts.map(event => formatDate(new Date(event.start!))))

const result = computed(() => {
  const res = []
  const startDate = new Date(state.rangeStart); const endDate = new Date(state.rangeEnd)
  for (let d = startDate; d < endDate; d = addDays(d, 1)) {
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

export {
  result, state,
}
