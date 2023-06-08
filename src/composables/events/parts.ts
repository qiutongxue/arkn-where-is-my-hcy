import { mergeObjOfNumberValue } from '../../misc/utils'

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
      card: 3,
    },
  },
  {
    name: '故事集「春分」',
    start: '2023/2/14',
    end: '2023/2/20',
    awards: eventAwards.StorySet(18),
  },
  {
    name: 'SideStory「吾导先路」【复刻】',
    start: '2023/2/21',
    end: '2023/3/2',
    awards: eventAwards.RetroSideStory(),
  },
  {
    name: '剿灭作战【龙门商业街】',
    start: '2023/3/6',
    end: '2023/3/6',
    awards: eventAwards.Others({ orundum: 1500 }),
  },
  {
    name: 'SideStory「落叶逐火」',
    start: '2023/3/7',
    end: '2023/3/27',
    awards: eventAwards.Others({ card: 23, orignitePrime: 16 }),
  },
  {
    name: '主线剧情「残阳」',
    start: '2023/4/6',
    end: '2023/4/16',
    awards: eventAwards.Others({ orignitePrime: 40 }),
  },
  {
    name: 'SideStory「愚人号」【复刻】',
    start: '2023/4/18',
    end: '2023/4/28',
    awards: eventAwards.RetroSideStory(),
  },
  {
    name: 'SideStory（四周年庆典）',
    start: '2023/5/1',
    end: '2023/5/14',
    awards: mergeObjOfNumberValue(eventAwards.SideStory(), eventAwards.Limited(0)),
  },
  {
    name: 'SideStory「空想花庭」',
    start: '2023/6/8',
    end: '2023/6/22',
    awards: eventAwards.Others({ orignitePrime: 16 }),
  },
]

export default parts
