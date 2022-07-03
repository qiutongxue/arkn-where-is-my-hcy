import { state } from './util'

const eventAwards = {
  SideStory(retro = false) {
    return {
      card: 3,
      orundum: retro ? 2000 : 0,
    }
  },
  StorySet() {
    return {
      card: 0,
    }
  },
  Limited() {
    return {
      orundum: 500 * 14,
      card: 14 + 10,
    }
  },
  Others(orundum = 0, card = 0) {
    return {
      orundum,
      card,
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
  daily: ArknEvent[]
  weekly: ArknEvent[]
  monthly: ArknEvent[]
  parts: ArknEvent[]
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
    // {
    //     name: '黄票商店',
    //     required: (date?: Date) => false,
    //     awards: {
    //         card: 38
    //     }
    // }
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
      start: '2022/7/28',
      end: '2022/8/10',
      // required: 'equalStart',
      awards: eventAwards.SideStory(true),
    },
    {
      name: '【SS】2022夏活',
      start: '2022/8/16',
      end: '2022/8/29',
      // required: 'equalStart',
      awards: mixingEvent(eventAwards.Limited, eventAwards.SideStory),
    },
  ],
}

export default events
