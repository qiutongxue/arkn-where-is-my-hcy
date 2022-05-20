import {computed, reactive, Ref, ref} from 'vue'

type AwradsType = {
    orundum?: number
    card?: number
}
type EventType = {
    name: string
    start?: Date
    end?: Date
    required: (date?: Date) => boolean
    awards: AwradsType
}

export const awardList = {   
    DAILY_EVENT_ORUNDUM: 100,  // 日常
    DAILY_MOONCARD_ORUNDUM: 200,    // 月卡
    WEEKLY_$jiaomie_ORUNDUM: 1800,    // 剿灭
    WEEKLY_EVENT: 500, // 周常
    MOONLY_STROE_ORUNDUM: 600, // 月初送的合成玉
    MOONLY_STORE_CARD: 1 + 2 // 月初送的招募券（包含第二层） 
}

const isUsedGreenCard = reactive([true, true, false])
const hasMoonCard = ref(false)
const moonCardRange = ref<[number, number]>([Date.now(), Date.now()])
const rangeStart = ref<number>(Date.now()), rangeEnd = ref<number>(Date.now())
const currentOrundum = ref<number>(0), currentCard = ref<number>(0)

export function useMoonCard() {
    return {hasMoonCard, moonCardRange}
}

export function useCurrent() {  
    return {currentOrundum, currentCard}
}   

export function useRange() {
    return {rangeStart, rangeEnd}
}

export function useGreenCard() {
    return isUsedGreenCard
}

export function useResult() {
    return computed(() => {
        const res = []
        const startDate = new Date(rangeStart.value), endDate = new Date(rangeEnd.value)
        for (let d = startDate; d < endDate; addOneDay(d)) {
            let t = {
                date: new Date(d), 
                details: [] as EventType[]
            }
            for (const event of dailyEvents) {
                if (event.required(d)) {
                    t.details.push(event)
                }
            }
            if (isMonday(d)) {  // 周常 + 剿灭
                for (const event of weeklyEvents) {
                    if (event.required(d)) {
                        t.details.push(event)
                    }
                }
            }
            if (isFirstDay(d)) { // 每月
                for (const event of monthlyEvents) {
                    if (event.required(d)) {
                        t.details.push(event)
                    }
                }
            }
            // 活动
            for (const event of actEvents) {
                if (event.required(d)) {
                    t.details.push(event)
                }
            }
            res.push(t)
        }
        return res
    })
}

const dailyEvents: EventType[] = [
    {
        name: "日常任务",
        required: () => true,
        awards: {
            orundum: 100
        }
    },
    {
        name: "月卡",
        required: (date?: Date) => {
            return !!date && isMoonCard(date)
        },
        awards: {
            orundum: 200
        }
    },
    // {
    //     name: "维护补偿",
    //     required: (date?: Date) => {
    //         return !!date && date.getDa
    //     },
    //     awards: {

    //     }
    // }
]

const weeklyEvents: EventType[] = [
    {
        name: '剿灭',
        required: (date?: Date) => true,
        awards: {
            orundum: 1800
        }
    },
    {
        name: '周常任务',
        required: (date?: Date) => true,
        awards: {
            orundum: 500
        }
    }
]

const monthlyEvents: EventType[] = [
    {
        name: '绿票商店【一】',
        required: (date?: Date) => isUsedGreenCard[0],
        awards: {
            orundum: 600,
            card: 2
        }
    },
    {
        name: '绿票商店【二】',
        required: (date?: Date) => isUsedGreenCard[1],
        awards: {
            card: 2
        }
    }, 
    {
        name: '黄票商店',
        required: (date?: Date) => false,
        awards: {
            card: 38
        }
    }
]

const checkEvent = (d1: Date, d2: Date) => {
    return d1.toDateString() === d2.toDateString()
}

export const events = [
    {
        name: "【复刻】覆潮之下",
        start: new Date("2022/6/8"),
        end: new Date("2022/6/17"),
        awards: {
            card: 3
        }
    },
    {
        name: "【SS】不知道",
        start: new Date("2022/6/21"),
        end: new Date("2022/7/5"),
        awards: {
            card: 3,
        }
    },
    {
        name: "【新剿灭400杀】",
        start: new Date("2022/7/11"),
        end: new Date("2022/7/11"),
        awards: {
            orundum: 1500,
        }
    },
    {
        name: "【复刻】多索雷斯假日",
        start: new Date("2022/7/5"),
        end: new Date('2022/7/15'),
        awards: {
            orundum: 2000, // 紫票商店
            card: 3 // 活动商店兑换
        }
    },
    {
        name: "【SS】2022夏活",
        start: new Date("2022/8/4"),
        end: new Date("2022/8/19"),
        awards: {
            orundum: 500 * 14,
            card: 10 + 14 + 3
        }
    }
    
]

const actEvents = events.map(event => {
    return {
        name: event.name,
        required: (date?: Date) => checkEvent(date!, event.start),
        awards: event.awards
    }
})

const addOneDay = (date: Date) => {
    date.setDate(date.getDate() + 1)
}

const isMoonCard = (date: Date) => {
    return hasMoonCard.value && 
    moonCardRange.value[0] <= date.getTime() && 
    date.getTime() <= moonCardRange.value[1]
}

const isMonday = (date: Date) => {
    return date.getDay() === 1
}
const isFirstDay = (date: Date) => {
    return date.getDate() === 1
}


export {
    isFirstDay,
    isMonday,
    isMoonCard,
    addOneDay
}
