<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
// import Calendar from './components/Calendar.vue'
import { NConfigProvider, GlobalThemeOverrides, NThemeEditor, zhCN, dateZhCN } from 'naive-ui';

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#f0c32d'
  },
}

</script>

<template>
  <NConfigProvider :locale="zhCN" :date-locale="dateZhCN">
    <HelloWorld :msg="`TypeScript + Vite + Vue3`" />
  </NConfigProvider>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
