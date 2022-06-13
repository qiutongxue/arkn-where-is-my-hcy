<script setup lang="ts">
const props = defineProps<{
    title?: string
}>()
</script>

<template>
    <div class="border border-#efeff3 rounded-5 relative overflow-hidden shadow shadow-md">
        <slot></slot>
        <div class="absolute left--1 top--1 text-7xl text-#eee font-italic font-bold z--1">
            {{ props.title }}
        </div>
    </div>
</template>