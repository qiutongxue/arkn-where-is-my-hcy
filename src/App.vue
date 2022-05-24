<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Index from './components/Index.vue'
import ArknInput from './components/ArknInput.vue'
// import Calendar from './components/Calendar.vue'
import { NConfigProvider, GlobalThemeOverrides, NThemeEditor, zhCN, dateZhCN } from 'naive-ui';

// const themeOverrides: GlobalThemeOverrides = {
//   common: {
//     primaryColor: '#f0c32d'
//   },
// }

</script>

<template>
  <NConfigProvider :locale="zhCN" :date-locale="dateZhCN">
    <header class="text-4xl p-4 m-4 font-bold"> 我合成玉呢 </header>
    <Index />
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
  /* margin-top: 60px; */
}
</style>
