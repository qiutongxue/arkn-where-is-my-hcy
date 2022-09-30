<script setup lang="ts">
import type { GlobalThemeOverrides } from 'naive-ui'
import { NConfigProvider, darkTheme, dateZhCN, zhCN } from 'naive-ui'
import { isDark, toggleDark } from './composables/dark'
import Index from './components/Index.vue'

const lightThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#0092d3',
    primaryColorHover: '#00acf7',
    primaryColorPressed: '#006e9e',
    primaryColorSuppl: '#0092d3',
  },
}

const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
    baseColor: '#ffffff',
    primaryColor: '#60b7fe',
    primaryColorHover: '#63ceff',
    primaryColorPressed: '#62b9ff',
    primaryColorSuppl: '#529cd8',
  },
  Radio: {
    buttonColor: '#0092d3',
    buttonColorActive: '#0092d3',
    buttonBorderColorActive: '#0092d3',
    buttonBorderColorHover: '#0092d3',
    buttonBoxShadowFocus: 'none',
  },
}
</script>

<template>
  <NConfigProvider
    :locale="zhCN" :date-locale="dateZhCN" :theme="isDark ? darkTheme : undefined"
    :theme-overrides="isDark ? darkThemeOverrides : lightThemeOverrides"
  >
    <header
      flex="~ gap-3"
      justify-end
    >
      <a href="https://github.com/qiutongxue/arkn-where-is-my-hcy" class="icon-button" i-ri-github-fill />
      <button
        class="icon-button"
        border-none
        i-ri-sun-line
        dark:i-ri-moon-line
        @click="() => toggleDark()"
      />
    </header>
    <main
      flex="~ col"
      items-center
      justify-center
    >
      <Index />
    </main>
  </NConfigProvider>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  /* color: #2c3e50; */
  margin: 1em auto;
  max-width: 1080px;
  padding: 1rem;
  /* margin-top: 60px; */
}

html.dark {
  background: #222;
  color: #eee;
  color-scheme: dark;
}

.icon-button {
  color: rgba(156,163,175, 1);
  font-size: 1.5rem;
  cursor: pointer;
  transition: all .5s;
  opacity: .7;
}

.icon-button:hover {
  opacity: 1;
}

*::-webkit-scrollbar {
  width: 6px;
}
*::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background-color: #80808077;
}
*::-webkit-scrollbar-thumb:hover {
  background-color: #808080aa;
}
*::-webkit-scrollbar-track {
  background-color: transparent;
}
</style>
