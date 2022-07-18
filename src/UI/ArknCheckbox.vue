<script lang="ts" setup>
import type { Component } from 'vue'
import { h, onMounted, ref } from 'vue'
import { useToggle } from '@vueuse/core'
// import { greenCard1URL } from '../misc/urls'
const props = defineProps<{
  // title: string
  checked: boolean
}>()

const emits = defineEmits(['update:checked'])

const [checked, toggleChecked] = useToggle(props.checked)

const checkboxRef = ref<HTMLDivElement>()

onMounted(() => {
  checkboxRef.value?.addEventListener('click', () => {
    toggleChecked()
    emits('update:checked', checked.value)
  })
})
</script>

<template>
  <div
    ref="checkboxRef"
    cursor-pointer py-4 relative z-0 overflow-hidden
    :bg="checked ? '#0092d3' : ''"
    shadow="md #6e6e6e"
  >
    <div flex items-center px-4>
      <!-- <div> -->
      <slot name="icon" />
      <div
        text-lg ml-4 flex-1 :text="`${checked ? '#f8fcfd' : '#555 dark:white'}`"
      >
        <slot />
      </div>
      <div
        :class="checked ? 'i-ri:checkbox-circle-line text-#0074ac' : ''"
        s-20 absolute top-8 right--5 z--1
      />
    </div>
  </div>
</template>

<style scoped>
</style>
