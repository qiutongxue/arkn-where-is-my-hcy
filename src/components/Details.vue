<script setup lang="ts">
import { computed } from 'vue'
import { cardURL, orundumURL } from '../misc/urls'
import result from '../composables/result'
import state from '../composables/state'

const detailInfo = computed(() => {
  const details: Record<string, {
    orundum: number
    card: number
  }> = {}
  if (state.currentOrundum || state.currentOrundum) {
    details['库存'] = {
      orundum: state.currentOrundum,
      card: state.currentCard,
    }
  }
  const value = result.value
  value.forEach((v) => {
    v.details.forEach((d) => {
      const name = d.name; const awards = d.awards
      const detail = details[name] || (details[name] = { orundum: 0, card: 0 })
      detail.orundum += awards.orundum || 0
      detail.card += awards.card || 0
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
          <div
            v-show="detailInfo[detail].orundum"
            flex="~ gap-1"
            text="xl red"
            items-center font-bold
          >
            {{ detailInfo[detail].orundum }}
            <img :src="orundumURL" alt="合成玉" w-8>
          </div>
          <div
            v-show="detailInfo[detail].card"
            flex="~ gap-1"
            text="xl amber"
            items-center font-bold
          >
            {{ detailInfo[detail].card }}
            <img :src="cardURL" alt="寻访凭证" w-8>
          </div>
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
