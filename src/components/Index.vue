<script setup lang="ts">
import {ref, computed, reactive, CSSProperties} from 'vue'
import {
    NDatePicker, 
    NInputNumber,
    NGrid,
    NGridItem,
    NSelect,
    NSwitch,
    NSpace,
    NCollapseTransition
    }  from "naive-ui"
import orundumURL from '../assets/orundum.png'
import cardURL from '../assets/card.png'
import {events, useRange, useMoonCard, useCurrent, useResult
} from '../assets/util'
import Calendar from './Calendar.vue'

const {hasMoonCard, moonCardRange} = useMoonCard()
const {rangeStart, rangeEnd} = useRange()
const {currentOrundum, currentCard} = useCurrent()
const result = useResult()

const isDateDisabled = (date: number) => {
    return date < (new Date().setDate(new Date().getDate() - 1))
}

const railStyle = ({checked, focused}: {checked: boolean, focused: boolean}) => {
    const style: CSSProperties = {}
    if (checked) {
        style.background = '#de9c00'
        if (focused) {
            style.boxShadow = '0 0 5px 2px #de9c0040'
        }
    } else {
        style.background = '#d3151c'
        if (focused) {
            style.boxShadow = '0 0 5px 2px #d3151c40'
        }
    }
    return style
}

const proxyEvents = reactive(events)
const showDetail = ref(true)

const selectOptions = computed(() => {
    return events.map(event => {
        return {
            label: event.name,
            value: event.end.getTime()
        }
    })
})

const handleSelectFallback = (value: number | string) => {
    return {
        label: '自定义',
        value
    }
}

const showTotalGacha = ref(false)

const totalOrundum = computed(() => {
    return currentOrundum.value + 
    result.value
    .map(v => {
        let value = 0
        v.details.forEach(d => value += d.awards.orundum || 0)
        return value
    })
    .reduce((p, c) => p + c, 0)
})

const totalCard = computed(() => {
    return currentCard.value + 
    result.value
    .map(v => {
        let value = 0
        v.details.forEach(d => value += d.awards.card || 0)
        return value
    })
    .reduce((p, c) => p + c, 0)
})

const detailInfo = computed(() => {
    let details: Record<string, {
        orundum: number,
        card: number
    }> = {}
    const value = result.value
    value.forEach(v => {
        v.details.forEach(d => {
            const name = d.name, awards = d.awards,
            detail = details[name] || (details[name] = { orundum: 0, card: 0})
            detail.orundum += awards.orundum || 0
            detail.card += awards.card || 0
        })
    })
    console.log(details)
    return details
})

</script>

<template>
<header class="text-4xl p-4"> 我合成玉呢 </header>
    <n-grid :cols="3" y-gap="12" class="items-center">
            <n-grid-item>
                <div class="text-xl">
                    当前合成玉数量：
                </div>
            </n-grid-item>
            <n-grid-item :span="2">
                <n-input-number size="large"
                    v-model:value="currentOrundum">
                    <template #suffix>
                        <img class="w-6 input-number-img" :src="orundumURL" alt="合成玉"/>
                    </template>
                </n-input-number>

            </n-grid-item>
            <n-grid-item>
                <div class="text-xl">
                    当前寻访凭证数量：
                </div>
            </n-grid-item>
            <n-grid-item :span="2">
                <n-input-number size="large"
                v-model:value="currentCard">
                    <template #suffix>
                        <img class="w-6 input-number-img" :src="cardURL" alt="合成玉"/>
                    </template>
                </n-input-number>
            </n-grid-item>
            <n-grid-item>

                <span class="text-xl">
                        选择月卡日期：
                </span>
               
            </n-grid-item>
            <n-grid-item :span="2">
                <n-grid :cols="4" class="items-center">
                <n-grid-item>
                    <n-switch v-model:value="hasMoonCard" />

                </n-grid-item>
                <n-grid-item :span="3">
                    <n-date-picker :disabled="!hasMoonCard" 
                    class="inline-block" 
                    :is-date-disabled="isDateDisabled" 
                    type="daterange" 
                    v-model:value="moonCardRange">
                    </n-date-picker>
                </n-grid-item>

                </n-grid>
            </n-grid-item>
            <n-grid-item class="self-start pt-4">
                <div class="text-xl">
                    选择计算日期：
                </div>
                
            </n-grid-item>
            <n-grid-item :span="2">
                <n-grid :cols="4" class="items-center">
                    <n-grid-item :span="1">
                    <div class="">
                        开始
                    </div>
                    </n-grid-item>
                    <n-grid-item :span="3">
                        <n-date-picker v-model:value="rangeStart"/>
                    </n-grid-item>
                    <n-grid-item :span="1">
                    <div class="">
                        结束
                    </div>
                    </n-grid-item>
                    <n-grid-item :span="1">
                        <n-select :options="selectOptions" 
                        :consistent-menu-width="false"
                        :fallback-option="handleSelectFallback" 
                        v-model:value="rangeEnd" />
                        <n-space>
                            </n-space>
                    </n-grid-item>
                    <n-grid-item :span="2">
                        <n-date-picker v-model:value="rangeEnd"/>
                    </n-grid-item>
                </n-grid>
            </n-grid-item>
    </n-grid>
    <n-space justify="center">
            <div v-show="!showTotalGacha" class="relative m-4 ">
                <img :src="orundumURL" class="w-20" alt="" />
                <span class=" absolute block bottom-1.5 text-white text-shadow-md font-bold bg-gray w-100% bg-op-70">
                    {{ totalOrundum }}
                </span>
            </div>

            <div :class="['transition-all', 'relative m-4']">
                <img :src="cardURL" class="w-20" alt="" />
                <span class=" absolute block bottom-1.5 text-white text-shadow-md font-bold bg-gray w-100% bg-op-70">
                    {{ totalCard + (showTotalGacha ? totalOrundum / 600 | 0 : 0) }}
                </span>
    
            </div>
    </n-space>
    <n-switch v-model:value="showTotalGacha" :rail-style="railStyle">
        <template #checked>换算</template>
        <template #unchecked>合计</template>
    </n-switch>

    <n-space vertical class="mt-4">
    <n-switch v-model:value="showDetail">
      <template #checked>
        展开
      </template>
      <template #unchecked>
        折叠
      </template>
    </n-switch>
    <n-collapse-transition :show="showDetail" >
      <div v-for="detail in Object.keys(detailInfo)"
      class="flex justify-center items-center gap-4 m-2">
      <span class="font-bold text-xl">
          {{ detail }}
      </span>
      <div v-show="detailInfo[detail].orundum" class="flex items-center gap-1 font-bold text-xl text-red">
      {{ detailInfo[detail].orundum }}
      <img :src="orundumURL" class="w-8" alt="">
      </div>
      <div v-show="detailInfo[detail].card" class="flex items-center gap-1 font-bold text-xl text-amber">
      {{ detailInfo[detail].card }}
      <img :src="cardURL" class="w-8" alt="">
      </div>
      </div>
    </n-collapse-transition>
  </n-space>
    <Calendar/>
    <div class="text-gray flex justify-end">
        注：活动时间是我瞎猜的
    </div>
</template>

<style scoped>
    .input-number-img {
        transform: translateY(.5em);
    }

    .user-info {
        grid-template-columns: 1fr 1fr;
    }

</style>
