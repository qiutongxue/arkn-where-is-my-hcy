<script setup lang="ts">
defineProps<{
    imgSrc?: string,
    title?: string,
    value?: number,
    placeholder?: string
}>()

const emits = defineEmits(['update:value'])

const handleInput = (e: Event) => {
    const val = (e.target as HTMLInputElement).value

    emits('update:value', Number(val))
}
</script>

<template>
    <div class="border border-#efeff3 rounded-5 min-h-40 relative overflow-hidden">
        <div class="flex min-h-40 ml-40 justify-between">
            <img :src="imgSrc" draggable="false" alt="" class="absolute left--10 op-50">
            <div class="flex-1 flex relative">
                <input type="number"
                    class="border-0 text-center text-5xl text-#555 font-bold focus:outline-none flex-1 w-100% "
                    :value="value" @input="handleInput" :placeholder="placeholder">
                <span class="absolute bottom-0 left-0 right-0 text-#777 title">{{ title }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* 扔掉箭头按钮 */
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
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