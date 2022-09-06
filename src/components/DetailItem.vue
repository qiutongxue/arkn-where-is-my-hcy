<script setup lang="ts">
import { resultHelper } from '../misc/utils'

defineProps<{
  name: string
  info: AwardsType
}>()
</script>

<template>
  <div mt-0 mr-4 mb-4 p-3 border-rounded-2 cursor-pointer class="detail-item">
    <span text="4">
      {{ name }}
    </span>
    <div mt-4 flex gap-4 justify-evenly>
      <template v-for="type in resultHelper" :key="type.name">
        <div
          v-show="info[type.name]"
          flex="~ gap-1"
          :text="`xl ${type.color}`"

          items-center font-bold
        >
          {{ info[type.name] }}
          <img :src="type.img" :alt="type.alt" w-8>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.detail-item {
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2), 0px 2px 7px rgba(0, 0, 0, .1);
  transition: transform .5s ease;
}

html.dark .detail-item {
  box-shadow: 0px 2px 5px rgba(255, 255, 255, .4), 0px 1px 7px rgba(255, 255, 255, .1)
}
.detail-item:hover {
  transform: translateY(-5%);
}
</style>
