<script setup lang="ts">
import { computed } from 'vue'
import { cardURL, orundumURL } from '../misc/urls'
import { resultHelper } from '../misc/utils'
import result from '../composables/result'
import state from '../composables/state'

const awardsTypes = resultHelper.map(r => r.name)

const detailInfo = computed(() => {
  const details: Record<string, {
    [K in keyof Required<AwardsType>]: number
  }> = {}
  if (state.currentOrundum || state.currentOrundum) {
    details['库存'] = {
      orundum: state.currentOrundum,
      card: state.currentCard,
      orignitePrime: state.currentOrignitePrime,
    }
  }
  const value = result.value
  value.forEach((v) => {
    v.details.forEach((d) => {
      const name = d.name
      const awards = d.awards
      const detail = details[name] || (details[name] = Object.fromEntries(awardsTypes.map(name => [name, 0])) as Record<keyof AwardsType, number>)
      awardsTypes.forEach((name) => {
        detail[name] += awards[name] || 0
      })
    })
  })

  return details
})
</script>

<template>
  <n-collapse mt-10>
    <n-collapse-item title="详细信息">
      <transition-group
        v-if="Object.keys(detailInfo).length" tag="div" name="list"
        relative
      >
        <div
          v-for="detail in Object.keys(detailInfo)" :key="detail"
          flex="~ gap-4" justify-center items-center m-2
        >
          <span font-bold text-xl>
            {{ detail }}
          </span>
          <template v-for="type in resultHelper" :key="type.name">
            <div
              v-show="detailInfo[detail][type.name]"
              flex="~ gap-1"
              :text="`xl ${type.color}`"

              items-center font-bold
            >
              {{ detailInfo[detail][type.name] }}
              <img :src="type.img" :alt="type.alt" w-8>
            </div>
          </template>
        </div>
      </transition-group>
      <div v-else>
        还没开始计算哦
      </div>
    </n-collapse-item>
    <n-collapse-item title="日历">
      <Calendar />
    </n-collapse-item>
  </n-collapse>
</template>

<style scoped>
.list-move,
/* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active
{
    transition: all .5s ease;
}

.list-enter-from,
.list-leave-to
{
    position: relative;
    opacity: 0;
    transform: translateX(1.5em);
}

/* 确保将离开的元素从布局流中删除
    以便能够正确地计算移动的动画。 */
.list-leave-active
{
    position: absolute;
    width: 100%;
}
</style>
