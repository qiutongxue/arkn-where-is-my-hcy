<script setup lang="ts">
import { NConfigProvider, darkTheme, dateZhCN, zhCN } from 'naive-ui'
import { useDark, useToggle } from '@vueuse/core'
import Index from './components/Index.vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <NConfigProvider :locale="zhCN" :date-locale="dateZhCN" :theme="isDark ? darkTheme : undefined">
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
  /* color: #2c3e50; */
  margin: 1em 2em;
  /* max-width: 960px; */
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
</style>
