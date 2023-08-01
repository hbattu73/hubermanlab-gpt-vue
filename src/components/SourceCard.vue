<template>
    <div class="flex flex-col max-w-[228px] lg:max-w-none shrink-0 overflow-hidden rounded-md border-1 border-neutral-300 cursor-pointer hover:shadow">
        <a :href="clipurl" target="_blank" class="group flex relative">
            <YouTubeIcon class="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 opacity-90 group-hover:opacity-100 group-hover:scale-110 duration-200 "/>
            <span class="absolute bottom-0 z-10 p-1 bg-slate-700/60 text-light-bg-primary/90 rounded-tr-md text-sm">{{ start }} - {{ end }}</span>
            <img class="group-hover:brightness-75 duration-200" 
                :src="thumbnail"
                :alt="title"
                rel="preload"/>
        </a>
        <div @click="showModal(modalIdx)" class="group flex flex-col px-3 pt-3 pb-4 font-geologica">
            <div class="flex">
                <span class="text-xs lg:text-xs xl:text-sm 2xl:text-base font-light text-primary whitespace-pre-wrap line-clamp-2">{{ title }} 
                </span>
            </div>
            <div class="inline-flex space-x-2 items-start pt-2">
                <DocumentIcon class="w-5 h-5 lg:w-5 lg:h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 shrink-0 group-hover:scale-110 duration-200"/>
                <span class="text-xs lg:text-[10px] xl:text-xs 2xl:text-sm font-extralight text-slate-700 leading-tight line-clamp-2">{{ content }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import YouTubeIcon from './svg/YouTubeIcon.vue'
import DocumentIcon from './svg/DocumentIcon.vue'
import { watch } from 'vue'
import { store } from '../stores/store'
import { useResponsive } from '../window'
// Accept props
const props = defineProps(['modalIdx', 'thumbnail', 'title', 'start', 'end', 'content', 'clipurl'])
const { width } = useResponsive()
const showModal = (key) => {
    if (width.value >= 1024) {
        store.modalIdx = key
    }
    // console.log(store.modalIdx)
}
watch(
    () => width.value, 
    (screen) => {
        store.modalIdx = screen < 1024 ? -1 : store.modalIdx
    }
)

</script>