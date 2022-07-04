import { reactive } from 'vue'

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
export default state
