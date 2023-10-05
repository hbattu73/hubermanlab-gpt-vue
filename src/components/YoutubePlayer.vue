<template>
    <Teleport to="body">
        <Transition name="fade">
            <div v-if="store.videoPlayer" 
            class="absolute px-4 lg:px-[72px] bottom-0 overflow-y-auto h-full bg-gray-700 w-full z-[100]" 
            :class="{ 'lg:h-1/3 md-lg:h-1/4': !enlarged }">
            <div class="flex flex-col h-full container" 
                :class="{ 'md-lg:flex-row': !enlarged,
                          'max-w-2xl w-full': enlarged }">
                    <div class="md-lg:hidden inline-flex items-center justify-end py-4">
                        <div @click="closePlayer()" class="flex p-2 bg-neutral-800 rounded-full cursor-pointer hover:brightness-125">
                            <CloseIcon class="w-5 h-5 text-neutral-400" />
                        </div>
                    </div>
                    <div v-if="enlarged" class="hidden md-lg:inline-flex py-4 items-center justify-end space-x-4">
                        <div @click="enlarged = false" class="flex p-2 bg-neutral-800 rounded-full cursor-pointer hover:brightness-125">
                            <MinimizeIcon class="w-5 h-5 text-neutral-400" />
                        </div>
                        <div @click="closePlayer()" class="flex p-2 bg-neutral-800 rounded-full cursor-pointer hover:brightness-125">
                            <CloseIcon class="w-5 h-5 text-neutral-400" />
                        </div>
                    </div>
                    <div class="flex grow-0"
                        :class="{ 'justify-center': enlarged,
                                  'md-lg:mr-5': !enlarged }">
                        <div class="aspect-video max-w-2xl w-full" 
                            :class="{ 'min-w-full': !enlarged }">
                            <iframe class="w-full h-full" 
                            :src="clipUrl"
                            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="1">
                            </iframe>
                        </div>
                    </div>
                    <div class="flex flex-col py-4"
                        :class="{ 'md-lg:hidden': !enlarged }">
                        <div class="flex flex-col space-y-2">
                            <div class="inline-flex space-x-1 items-center font-geologica text-gray-50 pb-4">
                                <span class="text-sm">Published</span>
                                <PublishedIcon class="w-5 h-5"/>
                                <span class="text-sm">:</span>
                                <span class="pl-4 text-xs font-mdedium text-gray-50">on {{ published }}</span>
                            </div>
                            <div class="inline-flex font-geologica text-gray-50 pb-4">
                                <div class="inline-flex space-x-1 pr-4">
                                    <span class="text-sm">Tags</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-amber-300">
                                        <path fill-rule="evenodd" d="M5.25 2.25a3 3 0 00-3 3v4.318a3 3 0 00.879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 005.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 00-2.122-.879H5.25zM6.375 7.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" clip-rule="evenodd" />
                                    </svg>
                                    <span class="text-sm">:</span>
                                </div>
                                <div class="flex justify-start gap-x-4 gap-y-3 flex-wrap text-xs text-slate-700 font-medium">
                                    <span v-for="t in tags" class="py-1 px-3 rounded-full bg-slate-300">{{ t }}</span>
                                </div>
                            </div>
                            <hr>
                            <div class="flex flex-col space-y-2 overflow-y-auto h-fit py-4">
                                <span class="font-geologica text-gray-50">{{ title }}</span>
                                <span class="font-geologica text-gray-50 font-light text-sm">{{ description }}</span>
                            </div>
                        </div>
                    </div>
                    <div v-if="!enlarged" class="hidden md-lg:flex" 
                        :class="{ 'md-lg:ml-5': !enlarged }">
                        <div class="flex flex-col py-2 w-full">
                            <div v-if="!enlarged" class="inline-flex items-center justify-end space-x-4 pb-1">
                                <div @click="enlarged = true" class="flex p-2 bg-neutral-800 rounded-full cursor-pointer hover:brightness-125">
                                    <EnlargeIcon class="w-4 h-4 text-neutral-400" />
                                </div>
                                <div @click="closePlayer()" class="flex p-2 bg-neutral-800 rounded-full cursor-pointer hover:brightness-125">
                                    <CloseIcon class="w-4 h-4 text-neutral-400" />
                                </div>
                            </div>
                            <div @scroll="onScroll" class="flex flex-col px-2 space-y-2 overflow-y-auto lg:h-4/6 md-lg:h-3/4"
                            :class="{ '[mask-image:linear-gradient(to_bottom,black_calc(100%-16px),transparent_100%)]': !bottom && top },
                                { '[mask-image:linear-gradient(to_bottom,transparent_0%,black_8px,black_calc(100%-16px),transparent_100%)]': !top && !bottom },
                                { '[mask-image:linear-gradient(to_bottom,transparent_0%,black_8px,black_calc(100%-0px),transparent_100%)]': !top && bottom }">
                                <span class="font-geologica text-gray-50">{{ title }}</span>
                                <span class="font-geologica text-gray-50 font-light text-sm">{{ description }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
import EnlargeIcon from './svg/EnlargeIcon.vue'
import MinimizeIcon from './svg/MinimizeIcon.vue'
import CloseIcon from './svg/CloseIcon.vue'
import PublishedIcon from './svg/PublishedIcon.vue'
import { ref, computed } from 'vue';
import { store } from '../stores/store'


const bottom = ref(false)
const top = ref(true)

function onScroll(e) {
    const { scrollTop, offsetHeight, scrollHeight } = e.target
    if (scrollTop + offsetHeight >= scrollHeight) {
        bottom.value = true
    }
    else {
        bottom.value = false
    }
    top.value = scrollTop == 0 ? true : false
}

const tags = computed(() => {
    return store.videoIdx >= 0 && store.videoPlayer ? store.passages[store.videoIdx]["video_tags"] : []
})

const title = computed(() => {
    return store.videoIdx >= 0 && store.videoPlayer ? store.passages[store.videoIdx]["title"] : ''
})

const published = computed(() => {
    return store.videoIdx >= 0 && store.videoPlayer ? store.passages[store.videoIdx]["published"] : ''
})

const description = computed(() => {
    return store.videoIdx >= 0 && store.videoPlayer ? store.passages[store.videoIdx]["video_description"] : ''
})

const clipUrl = computed(() => {
    return store.videoIdx >= 0 && store.videoPlayer ? store.passages[store.videoIdx]["clip_url"] : ''
})

const enlarged = ref(false)

const closePlayer = () => {
    store.videoPlayer = false
    store.videoIdx = -1
    enlarged.value = false
}

</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.10s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>