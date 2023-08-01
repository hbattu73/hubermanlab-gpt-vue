<template>
    <Teleport to="body">
        <div v-if="store.modalIdx >= 0"
            class="absolute flex grow-1 justify-center items-center inset-0 bg-transparent/20 z-50">
            <div v-on-click-outside="resetIdx" class="w-full max-w-xl h-screen max-h-96 border-1 border-gray-300 bg-light-bg-primary rounded-md shadow">
                <div class="flex flex-col px-6 py-4 font-geologica h-full">
                    <div class="flex border-b-1 border-primary/70 mb-1">
                        <span class="text-base font-light text-primary whitespace-pre-wrap line-clamp-2">{{ title }}</span>
                    </div>
                    <div class="flex max-h-72 overflow-y-auto pt-1">
                        <span class="text-sm font-extralight text-slate-700 leading-relaxed ">{{ content }}</span>
                    </div>
                    <div class="flex justify-between flex-1 items-end">
                        <div class="inline-flex space-x-1 items-center">
                            <PublishedIcon class="w-5 h-5"/>
                            <span class="text-xs font-light text-slate-700">{{ published }}</span>
                        </div>
                        <div class="inline-flex space-x-1 items-end">
                            <RankingIcon class="w-5 h-5"/>
                            <span class="text-xs font-light text-slate-700">{{ score }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
import PublishedIcon from './svg/PublishedIcon.vue'
import RankingIcon from './svg/RankingIcon.vue'
import { computed } from 'vue';
import { store } from '../stores/store'
import { vOnClickOutside } from '@vueuse/components'

function resetIdx() {
    store.modalIdx = -1
    console.log(store.modalIdx)
}

const title = computed(() => {
    return store.modalIdx >= 0 ? store.passages[store.modalIdx]["title"] : ''
})
const content = computed(() => {
    return store.modalIdx >= 0 ? store.passages[store.modalIdx]["content"] : ''
})
const published = computed(() => {
    return store.modalIdx >= 0 ? store.passages[store.modalIdx]["published"] : ''
})
const score = computed(() => {
    return store.modalIdx >= 0 ? store.passages[store.modalIdx]["score"].toFixed(2) : ''
})

</script>