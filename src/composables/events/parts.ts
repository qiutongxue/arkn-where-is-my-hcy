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
    name: '【复刻】覆潮之下',
    start: '2022/5/30',
    end: '2022/6/13',
    // required: 'start',
    awards: eventAwards.RetroSideStory(),
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
    awards: eventAwards.Others({ orundum: 1500 }),
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
    awards: eventAwards.RetroSideStory(),
  },
  {
    name: '【SS】理想城：长夏狂欢季',
    start: '2022/8/11',
    end: '2022/8/24',
    // required: 'equalStart',
    awards: mergeObjOfNumberValue(
      eventAwards.Limited(),
      eventAwards.SideStory()),
  },
  {
    name: '新剿灭400杀',
    start: '2022/9/5',
    end: '2022/9/5',
    awards: eventAwards.Others({ orundum: 1500 }),
  },
  {
    name: '【故事集】日暮寻路',
    start: '2022/9/8',
    end: '2022/9/14',
    // required: 'equalStart',
    awards: eventAwards.StorySet(18),
  },
  {
    name: '【故事集】好久不见',
    start: '2022/9/15',
    end: '2022/9/21',
    // required: 'equalStart',
    awards: eventAwards.StorySet(17),
  },
  {
    name: '【复刻】长夜临光',
    start: '2022/9/22',
    end: '2022/10/1',
    awards: eventAwards.RetroSideStory(),
  },
  {
    name: '主线第十一章',
    start: '2022/10/11',
    end: '2022/10/24',
    awards: eventAwards.Others({ orignitePrime: 42 }), // 按照第十章的源石数量：有 38 个
  },
  {
    name: '感谢庆典直播',
    start: '2022/10/23',
    end: '2022/10/23',
    awards: eventAwards.Others({ orundum: 1200 }),
  },
  {
    name: '【SS】3.5周年活动',
    start: '2022/11/1',
    end: '2022/11/14',
    // required: 'equalStart',
    awards: mergeObjOfNumberValue(
      eventAwards.Limited(0),
      eventAwards.SideStory()),
  },
  {
    name: '【复刻】风雪过境',
    start: '2022/12/1',
    end: '2022/12/10',
    awards: eventAwards.RetroSideStory(),
  },
  {
    name: '新剿灭400杀',
    start: '2022/12/26',
    end: '2022/12/26',
    awards: eventAwards.Others({ orundum: 1500 }),
  },
  {
    name: '【SS】照我以火',
    start: '2022/12/13',
    end: '2022/12/26',
    awards: eventAwards.SideStory(29),
  },
  {
    name: '【复刻】将进酒',
    start: '2023/1/1',
    end: '2023/1/10',
    awards: eventAwards.RetroSideStory(),
  },
  {
    name: '【SS】春节活动',
    start: '2023/1/19',
    end: '2023/2/1',
    awards: mergeObjOfNumberValue(
      eventAwards.Limited(0),
      eventAwards.SideStory(),
    ),
  },
]

export default parts