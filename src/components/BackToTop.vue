<script setup lang="ts">
import { ref, onBeforeMount, onUnmounted } from 'vue';
import { useScroll } from '@vueuse/core'
const props = withDefaults(defineProps<{
    targetHeight?: number
}>(), {
    targetHeight: () => 300
})
const visible = ref(false)
const { y } = useScroll(window, { behavior: 'smooth' })

onBeforeMount(() => {
    document.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
    console.log('嘿嘿 卸载了');
    document.removeEventListener('scroll', handleScroll)
})
const handleScroll = () => {
    visible.value = y.value > props.targetHeight
}
const handleToTop = () => {
    y.value = 0
}
</script>
<template>
    <div v-show="visible" class="backToTopBtn" @click="handleToTop">
        <slot>
            <div class="i-tabler-arrow-up text-2xl" />
        </slot>
    </div>
</template>
<style scoped>
.backToTopBtn {
    position: fixed;
    right: 20px;
    bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 40px;
    border: 1px solid transparent;
    border-radius: 50%;
    cursor: pointer;
    background-color: #f9f9f9;
    transition: border-color 0.25s;
}

.backToTopBtn:hover {
    border-color: #646cff;
}
</style>