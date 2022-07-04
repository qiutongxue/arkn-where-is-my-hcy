<script setup lang="ts">
import state from '../composables/state'
</script>

<template>
  <Card
    title="可选"
    p="y-5"
    m="y-5"
  >
    <div mt-14 px-4>
      <div
        flex="~ 1 wrap col gap-4"
        p="4"
      >
        <ArknCheckbox
          v-model:checked="state.isGreenStoreLevel1"
          w="auto"
        >
          绿票商店一层
        </ArknCheckbox>
        <ArknCheckbox
          v-model:checked="state.isGreenStoreLevel2"
          w="auto"
        >
          绿票商店二层
        </ArknCheckbox>
        <ArknCheckbox
          v-model:checked="state.isProduceOrundum"
          w="auto"
        >
          搓玉(200/天)
        </ArknCheckbox>
      </div>
    </div>
  </Card>
</template>

<style scoped>

</style>
