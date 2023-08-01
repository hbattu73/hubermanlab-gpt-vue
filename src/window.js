import { computed, onMounted, onUnmounted, ref } from 'vue'

export function useResponsive() {
    const windowWidth = ref(window.innerWidth)
    function onResize() {
        windowWidth.value = window.innerWidth
    }
    onMounted(() => window.addEventListener('resize', onResize))
    onUnmounted(() => window.removeEventListener('resize', onResize))

    const width = computed(() => {
        return windowWidth.value
    })
    return { width }
}