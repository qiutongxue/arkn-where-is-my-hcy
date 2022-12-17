import daily from './daily'
import weekly from './weekly'
import monthly from './monthly'
import parts from './parts'

type EventKey = 'daily' | 'monthly' | 'weekly' | 'parts'

const events: {
  [K in EventKey]: ArknEvent[]
} = {
  daily,
  weekly,
  monthly,
  parts,
}

export default events
