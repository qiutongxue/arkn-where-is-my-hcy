<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useToggle } from '@vueuse/core'
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
  <div ref="checkboxRef" class="checkbox" py-4 :border="`~ rounded-1 ${checked ? '#34ba9d dark:green' : 'red'}`">
    <div flex="~" justify-between px-4>
      <div text-lg>
        <slot />
      </div>
      <div :class="checked ? 'i-ri:check-fill text-green' : 'i-ri:close-fill text-red'" p-2 />
    </div>
  </div>
</template>

<style scoped>
.checkbox {
  cursor: pointer;
}
</style>
