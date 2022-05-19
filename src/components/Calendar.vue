<script setup lang="ts">
import { computed, reactive, ref, toRefs } from 'vue';
import { addOneDay, useCurrent, useResult  } from '../assets/util';
import { NButton } from 'naive-ui';
import orundumURL from '../assets/orundum.png'
import cardURL from '../assets/card.png'

const result = useResult()

const days = ["星期一", "星期二", "星期三", "星期四", "星期五",  "星期六", "星期天"]
let baseDate = ref<Date>(new Date(new Date().setDate(1)))
const tmps = computed(() => {
    const result = []
    const date = new Date(baseDate.value) 
    for (let i = 1; i < (date.getDay() || 7); i++) result.push("")
    for (let i = date, j = 0, month = baseDate.value.getMonth(); 
    j < 40 && i.getMonth() === month; 
    addOneDay(i), j++) {
        result.push(i.getDate())
    }
    return result
})


const computedData = computed(() => {
    const maps = [...tmps.value]
    const data = result.value.filter(d =>
        d.date.getFullYear() === baseDate.value.getFullYear() &&
        d.date.getMonth() === baseDate.value.getMonth()
    )
    const res = maps.map(m => {
        if (!m) return null
        const current = data.find(v => v.date.getDate() === m)
        let orundum = 0, card = 0
        current?.details.forEach(d => {
            orundum += d.awards.orundum || 0
            card += d.awards.card || 0
        })
        return {
            date: current?.date,
            orundum,
            card
        }
    })
    return res
})
const addMonth = () => {
    const date = baseDate.value
    baseDate.value = new Date(date.setMonth(date.getMonth() + 1))
}

const subMonth = () => {
    const date = baseDate.value
    baseDate.value = new Date(date.setMonth(date.getMonth() - 1))
}
</script>

<template>
<div class="p-4">

    <div class="flex gap-4 justify-end">
        <NButton @click="subMonth">←</NButton>
         <span class="font-bold text-3xl">{{ baseDate.getFullYear() }}</span>
         <span class="font-bold text-3xl">{{ baseDate.getMonth() + 1}}</span>
        <NButton @click="addMonth">→</NButton>
    </div>
    <div class="grid calendar mt-4">
        <div v-for="day in days" 
        class=" h-10 flex justify-center items-center" 
        :key="day">{{ day }}</div>
        <div v-for="(tmp, idx) in tmps" 
        class="relative min-h-10 max-h-50 flex justify-center items-center p-2" 
        :key="idx"> 
            <div v-if="tmp && computedData[idx]" class="text-xs text-white font-bold">
                <div v-if="computedData[idx]?.orundum" class="relative">
                    <img :src="orundumURL" class="max-w-20" alt="">
                    <span 
                    class="absolute block w-100% bottom-1.5 bg-gray bg-op-70 ">
                    {{ computedData[idx]!.orundum }}
                    </span>
                </div>
                <div v-if="computedData[idx]?.card" class="relative">
                    <img :src="cardURL" class="max-w-20" alt="">
                    <span
                    class="absolute block w-100% bottom-1.5 bg-gray bg-op-70">
                    {{ computedData[idx]!.card }}</span>
                </div>
            </div>
            <div class=" absolute text-sm text-gray-300 right-1 bottom-0">
                {{ tmp }}
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>
    .calendar {
        box-sizing: border-box;
        font-size: 1rem;
        grid-template-columns: repeat(7, 1fr);
        gap: .1em;
        border-top: 1px solid #efeff3;
        border-left: 1px solid #efeff3;
        /* grid-auto-flow: dense; */
    }

    .calendar > div {
        box-sizing: border-box;
        /* outline: black solid .1em; */
        border-bottom: 1px solid #efeff3;
        border-right: 1px solid #efeff3;
    }

</style>