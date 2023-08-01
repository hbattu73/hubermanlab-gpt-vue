<template>
    <div class="flex flex-col lg:pl-12 xl:pl-20 2xl:pl-36 space-y-4 overflow-x-auto">
        <div class="justify-center lg:justify-start inline-flex items-center space-x-2">
            <SourcesIcon class="w-5 h-5 drop-shadow-md"/>
            <h3 class="font-geologica font-medium lg:text-base xl:text-lg text-primary leading-5">Sources</h3>
        </div>
        <div class="flex flex-row lg:flex-col gap-3 overflow-y-auto">
            <div v-if="store.welcomePage" class="flex flex-col space-y-4 2xl:space-y-6 w-full">
                <span class="font-geologica font-normal text-sm 2xl:text-base text-primary text-center lg:text-start">Each chatbot response will also return the audio sources that the AI used to answer your query. The sources are</span>
                <div v-for="c in store.sourceCapabilites" class="relative inline-flex items-start justify-start pl-4 lg:pl-0 space-x-2">
                    <CheckIcon class="absolute top-0 lg:top-1 w-5 h-5"/>
                    <span class="font-geologica text-sm 2xl:text-base text-gray-800 font-light pl-5">{{ c }}</span>
                </div>
            </div>
            <TransitionGroup name="list">
                <SourceCard v-for="(p, idx) in store.passages"
                        :key="idx"
                        :modal-idx="idx"
                        :thumbnail="p.thumbnail"
                        :title="p.title"
                        :start="p.start"
                        :end="p.end"
                        :content="p.content"
                        :clipurl="p.clip_url"/>
            </TransitionGroup>
        </div>
    </div>
</template>

<script setup>
import SourcesIcon from './svg/SourcesIcon.vue'
import SourceCard from './SourceCard.vue'
import CheckIcon from './svg/CheckIcon.vue'
import { store } from '../stores/store'
</script>

<style>
.list-move, /* apply transition to moving elements */
.list-enter-active {
  transition: all 0.5s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
</style>