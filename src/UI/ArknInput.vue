<script setup lang="ts">
import Card from './Card.vue'
defineProps<{
  imgSrc?: string
  title?: string
  value?: number
  placeholder?: string
}>()

const emits = defineEmits(['update:value'])

const handleInput = (e: Event) => {
  const val = (e.target as HTMLInputElement).value

  emits('update:value', Number(val))
}
</script>

<template>
  <Card min-h-40 relative overflow-hidden shadow="~ md">
    <div flex min-h-40 ml-40 justify-between>
      <img
        :src="imgSrc" draggable="false" alt=""
        absolute
        left--10
        op-50
      >
      <div flex="~ 1" relative>
        <input
          type="number"
          class="input"
          border-0
          text="center 5xl #555 dark:#eee"
          font-bold
          focus:outline-none
          flex-1 w="100%"
          bg="dark:#222"
          :value="value || null" :placeholder="placeholder" @input="handleInput"
        >
        <span
          class="title"
          absolute bottom-0 left-0 right-0
          text="#777 dark:#eee"
        >{{ title }}</span>
      </div>
    </div>
  </Card>
</template>

<style scoped>
/* 扔掉箭头按钮 */
.input[type=number]::-webkit-inner-spin-button,
.input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.input::-webkit-input-placeholder {
    color: #eee;
    /* font-size: 2rem; */
    font-style: italic;
}

html.dark .input::-webkit-input-placeholder {
  color: #444;
}

.title::after {
    content: "-";
    padding: 4px;
}

.title::before {
    content: '-';
    padding: 4px;

}
</style>
