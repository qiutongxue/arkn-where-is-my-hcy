<script setup lang="ts">
import { ref, onMounted } from 'vue'
const props = defineProps<{
    imgSrc?: string
    title?: string
    value?: boolean
}>()

// const wrapper = ref<HTMLDivElement>()
// onMounted(() => {
//     console.log(wrapper.value)
//     console.log(props.imgSrc)
//     // if (wrapper.value) {
//     //     wrapper.value.style.backgroundImage = `linear-gradient(to left, rgba(255, 255, 255, 1),  rgba(255, 255, 255, 0)), url(${props.imgSrc})`
//     //     wrapper.value.style.backgroundSize = '50%'
//     // }
// })


</script>

<template>
    <div class="border border-#efeff3 rounded-5 relative overflow-hidden py-4">
        <div class="flex justify-between">
            <div>

            </div>
            <input type="checkbox" class="">
        </div>
    </div>
</template>

<style scoped>
</style>
