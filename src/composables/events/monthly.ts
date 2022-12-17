import state from '../state'

const monthly: ArknEvent[] = [
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

]

export default monthly
