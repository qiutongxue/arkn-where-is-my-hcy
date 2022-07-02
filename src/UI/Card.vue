<script setup lang="ts">
const props = defineProps<{
  title?: string
}>()
</script>

<template>
  <div
    border="~ #efeff3 dark:#444 rounded-1"
    shadow="~ md dark:#3f3f3f"
    relative
    overflow-hidden
  >
    <slot />
    <div
      absolute left--1 top--1
      text="7xl #eee"
      font="italic bold"
      z--1
    >
      {{ props.title }}
    </div>
  </div>
</template>
