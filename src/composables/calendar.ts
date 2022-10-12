import { endOfWeek as _endOfWeek, startOfWeek as _startOfWeek, addDays, addMonths, addWeeks, endOfMonth, getWeeksInMonth, min, startOfMonth, subMonths } from 'date-fns'
import type { Ref } from 'vue'
import { computed, ref } from 'vue'

const getDateId = (date: Date) =>
  (date.getFullYear() * 10000) + (date.getMonth() * 100) + date.getDate()

const endOfWeek = (day: Date) => _endOfWeek(day, { weekStartsOn: 1 })
const startOfWeek = (day: Date) => _startOfWeek(day, { weekStartsOn: 1 })

const checkRecentEventFromIndex = (week: DayType[], day: Date, idx: number) => {
  if (day.getDate() === 1)
    return false
  for (let i = (day.getDay() + 5) % 7; i >= 0; i--) {
    if (
      !week[i]
      || week[i].events.length - 1 < idx
      || week[i].events[idx].isEmpty
    ) continue

    const recent = week[i].events[idx]
    return recent.end >= day
  }
  return false
}

const getEvents = (day: Date, week: DayType[], events: CalendarEvent[]) => {
  const dayId = getDateId(day)
  const result = events.filter((e) => {
    return getDateId(e.start) === dayId
          || ((day.getDay() === 1 || day.getDate() === 1) && e.start <= day && day <= e.end)
  })
  const res: CalendarEvent[] = []
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

  return res.map((e) => {
    let width = 90
    for (let i = addDays(day, 1), last = min([endOfWeek(day), endOfMonth(day)])
      ; i <= e.end && i <= last
      ; i = addDays(i, 1)
    )
      width += 100
    return {
      ...e,
      width,
    }
  })
}

export function useCalendar(calendarEvents: Ref<CalendarEvent[]>, initDate?: Date) {
  const baseDate = ref<Date>(startOfMonth(initDate ? initDate.getTime() : Date.now()))

  const weeks = computed(() => {
    const weeksCount = getWeeksInMonth(baseDate.value, { weekStartsOn: 1 })
    const firstDayOfMonth = startOfMonth(baseDate.value)
    const lastDayOfMonth = endOfMonth(baseDate.value)
    const result = []
    for (let i = 0, date = baseDate.value; i < weeksCount; i++, date = addWeeks(date, 1)) {
      const start = startOfWeek(date)
      const end = endOfWeek(date)
      const week: DayType[] = []
      for (let d = start; d <= end; d = addDays(d, 1)) {
        const events = getEvents(d, week, calendarEvents.value)
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

  const getYear = () => {
    return baseDate.value.getFullYear()
  }

  const getMonth = () => {
    return baseDate.value.getMonth() + 1
  }
  return { weeks, addMonth, subMonth, getYear, getMonth }
}
