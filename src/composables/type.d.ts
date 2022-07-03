declare interface ArknEvent {
  name: string
  awards: AwardsType
  required?: Requires
  start?: string
  end?: string
}

interface CalendarEvent {
  name: string
  start: Date
  end: Date
  awards: AwardsType
  color: string
  width?: number
  isEmpty?: boolean
}

interface DayType {
  date: Date
  out: boolean
  events: CalendarEvent[]
}

type StringTemplate<key extends string, value extends string> = `${key}:${value}`

interface AwardsType {
  orundum?: number
  card?: number
}

type Requires = 'prime' | 'orundumProd' | 'sign17' | 'equalStart' | StringTemplate<'greenStoreLevel', '1' | '2'>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Split<T extends string> = T extends `${infer K}:${infer V}` ? K : T

type ParsedRequires = Split<Requires>

type EventMap = Omit<ArknEvent, 'required'> & {
  required: Function
}
