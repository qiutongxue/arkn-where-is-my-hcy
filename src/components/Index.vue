<script setup lang="ts">
import { cardURL, orundumURL } from '../misc/urls'
import state from '../composables/state'
</script>

<template>
  <div text="4xl" p="x-4 t-4" m-4 font-bold>
    我合成玉呢
  </div>
  <div flex items-center text="#aaa">
    <span><strong>粗略</strong>计算抽卡次数</span>
    <Rules />
  </div>
  <transition-group tag="div" name="list">
    <ArknInput
      key="orundumInput"
      v-model:value="state.currentOrundum"
      :img-src="orundumURL" title="合成玉" placeholder="你有多少"
      m="y-4"
    />
    <ArknInput
      key="cardInput"
      v-model:value="state.currentCard"
      :img-src="cardURL" title="寻访凭证" placeholder="你有多少"
      m="y-4"
    />
    <PrimeCard key="primeCard" />
    <Others key="choseCard" />
    <ChooseRange key="computeCard" />

    <n-divider key="divider" />

    <Result key="transitionGroup1" />
    <Details key="collapse" />
    <div key="footTag" text-gray flex justify-end>
      注：活动时间是我瞎猜的
    </div>
  </transition-group>
</template>

<style scoped>
.list-move,
/* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
    transition: all .5s ease;
}

/* .list-enter-from {
        opacity: 0;
    } */
.list-enter-from,
.list-leave-to {
    position: relative;
    opacity: 0;
    transform: translateX(1.5em);
}

/* 确保将离开的元素从布局流中删除
    以便能够正确地计算移动的动画。 */
.list-leave-active {
    position: absolute;
    width: 100%;
}

/* .list-leave-from {
    position: relative
} */
</style>
