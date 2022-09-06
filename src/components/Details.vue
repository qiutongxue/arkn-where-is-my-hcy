<script setup lang="ts">
import { computed } from 'vue'
import { cardURL, orundumURL } from '../misc/urls'
import { resultHelper } from '../misc/utils'
import result from '../composables/result'
import state from '../composables/state'

const awardsTypes = resultHelper.map(r => r.name)

const detailInfo = computed(() => {
  const details: Record<string, AwardsType> = {}
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
      const detail = details[name]
        || (details[name] = Object.fromEntries(awardsTypes.map(name => [name, 0])))
      awardsTypes.forEach((name) => {
        detail[name] = (detail[name] || 0) + (awards[name] || 0)
      })
    })
  })

  return details
})

const transitionAfterLeaveBeforeEnter = (el: Element) => {
  (el as HTMLElement).style.top = ''
  ;(el as HTMLElement).style.left = ''
  ;(el as HTMLElement).style.width = ''
}

const transitionBeforeLeave = (el: Element) => {
  const elRect = el.getBoundingClientRect()
  const paRect = el.parentElement?.getBoundingClientRect() || { top: 0, left: 0 }
  const left = elRect.left - paRect.left
  const top = elRect.top - paRect.top
  const width = elRect.width

  ;(el as HTMLElement).style.top = `${top}px`
  ;(el as HTMLElement).style.left = `${left}px`
  ;(el as HTMLElement).style.width = `${width}px`
}
</script>

<template>
  <n-collapse mt-10>
    <n-collapse-item title="详细信息">
      <TransitionGroup
        v-if="Object.keys(detailInfo).length"
        tag="div"
        name="list" relative flex flex-wrap
        @before-leave="transitionBeforeLeave"
        @after-leave="transitionAfterLeaveBeforeEnter"
      >
        <DetailItem
          v-for="[name, info] in Object.entries(detailInfo)" :key="name"
          :name="name" :info="info"
        />
      </TransitionGroup>
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
.list-move,   /* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active
{
    transition: all .5s ease;
}

.list-enter-from,
.list-leave-to  {
    position: relative;
    opacity: 0;
    transform: translateX(-100%);
}
/* .list-enter-from {
  transition-property: opacity !important;
} */
/* 确保将离开的元素从布局流中删除
    以便能够正确地计算移动的动画。 */
.list-leave-active {
    position: absolute;
}
</style>
