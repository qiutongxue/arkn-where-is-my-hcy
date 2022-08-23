import { isToday } from 'date-fns'
import state from './state'

type EventKey = 'daily' | 'monthly' | 'weekly' | 'parts'

const eventAwards/* : Record<string, (...args: any[]) => AwardsType> */ = {
  SideStory(retro = false) {
    return {
      card: 3,
      orundum: retro ? 2000 : 0,
      orignitePrime: retro ? 0 : (10 + 16),
    }
  },
  StorySet(orignitePrime = 16) {
    return {
      card: 0,
      orignitePrime, // 假设有 8 关（实际上故事集关卡不固定）
    }
  },
  Limited(orignitePrime = 5) {
    return {
      orundum: 500 * 14,
      card: 14 + 10,
      orignitePrime, // 假设普通关（包括教学）有 10 关，EX 8 关。还会有 5~9 个多余高难关
    }
  },
  Others(orundum = 0, card = 0, orignitePrime = 0) {
    return {
      orundum,
      card,
      orignitePrime,
    }
  },
}

const mixingEvent = (...events: (() => AwardsType)[]) => {
  const result: AwardsType = {}
  events.forEach((event) => {
    const e = event()
    const objKeys = Object.keys(e) as Array<keyof AwardsType>
    objKeys.forEach((k) => {
      result[k] = (result[k] || 0) + (e[k] || 0)
    })
  })
  return result
}

const isPrimeAccess = (date: Date) => {
  return state.hasPrimeAccess
          && state.primeAccessStart <= date.getTime()
          && date.getTime() <= state.primeAccessEnd
}

const events: {
  [K in EventKey]: ArknEvent[]
} = {
  daily: [
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
  ],
  weekly: [
    {
      name: '剿灭',
      awards: {
        orundum: 1800,
      },
    },
    {
      name: '周常任务',
      awards: {
        orundum: 500,
      },
    },
  ],
  monthly: [
    {
      name: '绿票商店【一】',
      awards: {
        orundum: 600,
        card: 2,
      },
      required: (_date: Date) => state.isGreenStoreLevel1,
    },
    {
      name: '绿票商店【二】',
      required: (_date: Date) => state.isGreenStoreLevel2,
      awards: {
        card: 2,
      },
    },

  ],
  parts: [
    {
      name: '【复刻】覆潮之下',
      start: '2022/5/30',
      end: '2022/6/13',
      // required: 'start',
      awards: eventAwards.SideStory(true),
    },
    {
      name: '【SS】尘影余音',
      start: '2022/6/9',
      end: '2022/6/23',
      // required: 'equalStart',
      awards: eventAwards.SideStory(),
    },
    {
      name: '【SS】绿野幻梦',
      start: '2022/7/5',
      end: '2022/7/18',
      // required: 'equalStart',
      awards: eventAwards.SideStory(),
    },
    {
      name: '新剿灭400杀',
      start: '2022/7/11',
      end: '2022/7/11',
      // required: 'equalStart',
      awards: eventAwards.Others(1500),
    },
    {
      name: '【故事集】未尽篇章',
      start: '2022/7/19',
      end: '2022/7/25',
      // required: 'equalStart',
      awards: eventAwards.StorySet(),
    },
    {
      name: '【复刻】多索雷斯假日',
      start: '2022/7/26',
      end: '2022/8/8',
      // required: 'equalStart',
      awards: eventAwards.SideStory(true),
    },
    {
      name: '【SS】理想城：长夏狂欢季',
      start: '2022/8/11',
      end: '2022/8/24',
      // required: 'equalStart',
      awards: mixingEvent(eventAwards.Limited, eventAwards.SideStory),
    },
    {
      name: '新剿灭400杀',
      start: '2022/9/5',
      end: '2022/9/5',
      awards: eventAwards.Others(1500),
    },
    {
      name: '主线第十一章',
      start: '2022/9/13',
      end: '2022/9/26',
      awards: eventAwards.Others(0, 0, 38), // 按照第十章的源石数量：有 38 个
    },
    {
      name: '【SS】未知SideStory1',
      start: '2022/9/29',
      end: '2022/10/12',
      awards: eventAwards.SideStory(),
    },
    {
      name: '【复刻】长夜临光',
      start: '2022/10/13',
      end: '2022/10/23',
      awards: eventAwards.SideStory(true),
    },
    {
      name: '感谢庆典直播',
      start: '2022/10/23',
      end: '2022/10/23',
      awards: eventAwards.Others(1200, 0),
    },
    {
      name: '【SS】3.5周年活动',
      start: '2022/11/1',
      end: '2022/11/14',
      // required: 'equalStart',
      awards: mixingEvent(eventAwards.Limited, eventAwards.SideStory),
    },
  ],
}

export default events
