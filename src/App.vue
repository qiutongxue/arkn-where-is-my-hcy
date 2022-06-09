<script setup lang="ts">
import Index from './components/Index.vue'
import { NConfigProvider, zhCN, dateZhCN } from 'naive-ui';

</script>

<template>
  <NConfigProvider :locale="zhCN" :date-locale="dateZhCN">
    <div class="flex flex-col items-center justify-center">
      <header class="text-4xl px-4 pt-4 m-4 font-bold"> 我合成玉呢 </header>
      <div class="text-#aaa"><strong>粗略</strong>计算抽卡次数</div>
      <Index />
    </div>
  </NConfigProvider>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 1em 2em;
  /* max-width: 960px; */
  /* margin-top: 60px; */
}
</style>
