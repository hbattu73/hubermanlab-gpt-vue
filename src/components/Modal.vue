<template>
    <Teleport to="body">
        <Transition name="fade">
            <div v-if="store.modalIdx >= 0"
            class="absolute flex grow-1 justify-center items-center inset-0 bg-transparent/20 z-50">
                <div v-on-click-outside="resetIdx" class="w-full max-w-xl xl:max-w-2xl 2xl:max-w-3xl h-screen max-h-96 xl:max-h-[420px] 2xl:max-h-[496px] border-1 border-gray-300 bg-light-bg-primary rounded-md shadow">
                    <div class="flex flex-col px-6 py-4 font-geologica h-full">
                        <div class="flex border-b-1 border-primary/70 mb-1">
                            <span class="text-base xl:text-lg 2xl:text-xl font-light text-primary whitespace-pre-wrap line-clamp-2">{{ title }}</span>
                        </div>
                        <div class="flex max-h-72 xl:max-h-80 2xl:max-h-96 overflow-y-auto no-scrollbar pt-1">
                            <span class="text-sm xl:text-base 2xl:text-lg font-extralight text-slate-700 leading-relaxed ">{{ content }}</span>
                        </div>
                        <div class="flex justify-between flex-1 items-end">
                            <div class="inline-flex space-x-1 2xl:space-x-2 items-center">
                                <PublishedIcon class="w-5 h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7"/>
                                <span class="text-xs xl:text-sm 2xl:text-base font-light text-slate-700">{{ published }}</span>
                            </div>
                            <div class="inline-flex space-x-1 2xl:space-x-2 items-end">
                                <RankingIcon class="w-5 h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7"/>
                                <span class="text-xs xl:text-sm 2xl:text-base font-light text-slate-700">{{ score }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
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
    // console.log(store.modalIdx)
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
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>