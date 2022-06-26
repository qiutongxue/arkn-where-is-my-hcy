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
  <Card class="min-h-40 relative overflow-hidden shadow shadow-md">
    <div class="flex min-h-40 ml-40 justify-between">
      <img :src="imgSrc" draggable="false" alt="" class="absolute left--10 op-50">
      <div class="flex-1 flex relative">
        <input
          type="number"
          class="input border-0 text-center text-5xl text-#555 font-bold focus:outline-none flex-1 w-100% "
          :value="value || null" :placeholder="placeholder" @input="handleInput"
        >
        <span class="absolute bottom-0 left-0 right-0 text-#777 title">{{ title }}</span>
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

.title::after {
    content: "-";
    padding: 4px;
}

.title::before {
    content: '-';
    padding: 4px;

}
</style>
