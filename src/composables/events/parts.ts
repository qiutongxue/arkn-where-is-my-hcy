const eventAwards/* : Record<string, (...args: any[]) => AwardsType> */ = {
  SideStory(orignitePrime = 26) {
    return {
      card: 3,
      orundum: 0,
      orignitePrime,
    }
  },
  RetroSideStory(orignitePrime = 0) {
    return {
      card: 3,
      orundum: 2000, /* 紫票商店兑换 */
      orignitePrime,
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
  Others({ orundum = 0, card = 0, orignitePrime = 0 }) {
    return {
      orundum,
      card,
      orignitePrime,
    }
  },
}

const parts: ArknEvent[] = [
  {
    name: '生息演算「沙中之火」',
    start: '2023/1/29',
    end: '2023/3/11',
    awards: {
      card: 0,
    },
  },
  {
    name: '【故事集】春分',
    start: '2023/2/14',
    end: '2023/2/20',
    awards: eventAwards.StorySet(18),
  },
]

export default parts
