import { reactive } from 'vue'
import { startOfDay } from 'date-fns'

const now = startOfDay(Date.now()).getTime()

const state = reactive({
  isGreenStoreLevel1: true,
  isGreenStoreLevel2: true,
  isYellowStore: false,
  hasPrimeAccess: false,
  primeAccessStart: now,
  primeAccessEnd: now,
  rangeStart: now,
  rangeEnd: now,
  currentOrundum: 0,
  currentCard: 0,
  currentOrignitePrime: 0,
  isProduceOrundum: false,
})

export const updatePrimeRange = (start: number, end: number) => {
  state.primeAccessStart = start
  state.primeAccessEnd = end
}
export default state
