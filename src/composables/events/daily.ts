import { isToday } from 'date-fns'
import state from '../state'

const isPrimeAccess = (date: Date) => {
  return state.hasPrimeAccess
            && state.primeAccessStart <= date.getTime()
}

const daily: ArknEvent[] = [
  {
    name: '日常任务',
    awards: {
      orundum: 100,
    },
  },
  {
    name: '月卡',
    awards: {
      orundum: 200,
    },
    required: (date: Date) => !!date && isPrimeAccess(date),
  },
  {
    name: '搓玉',
    awards: {
      orundum: 200,
    },
    required: (_date: Date) => state.isProduceOrundum,
  },
  {
    name: '每日签到',
    awards: {
      card: 1,
    },
    required: (date: Date) => date.getDate() === 17,
  },
  {
    name: '黄票商店',
    required: (date: Date) => state.isYellowStore && isToday(date),
    awards: {
      card: 38,
    },
  },
]

export default daily
