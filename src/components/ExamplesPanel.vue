<template>
    <div class="flex flex-col min-w-full">
        <div class="flex justify-center lg:justify-start">
            <span class="font-geologica font-medium lg:text-base xl:text-lg text-primary leading-5">Examples to get you started</span>
        </div>
        <div class="flex justify-center lg:justify-start py-2">
            <div @click="questions=false" class="inline-flex items-center space-x-2 pr-6 py-1 border-r-1 cursor-pointer"
                :class="{'opacity-60': questions,
                         'hover:opacity-75': questions}">
                <TopicIcon class="w-5 h-5 2xl:w-7 2xl:h-7 drop-shadow-lg"/>
                <span class="font-geologica font-normal text-gray-700 text-sm 2xl:text-base">Topics</span>
            </div>
            <div @click="questions=true" class="inline-flex items-center space-x-2 pl-6 cursor-pointer"
                :class="{'opacity-60': !questions,
                         'hover:opacity-75': !questions}">
                <QuestionIcon class="w-5 h-5 2xl:w-7 2xl:h-7 drop-shadow-lg"/>
                <span class="font-geologica font-normal text-gray-700 text-sm 2xl:text-base">Questions</span>
            </div>
        </div>
        <div class="flex justify-center lg:justify-start pt-2 gap-x-4 gap-y-3 flex-wrap font-geologica font-extralight text-sm 2xl:text-base text-light-bg-primary">
            <span 
                v-if="!questions" 
                v-for="t in store.topics" 
                @click="query(t)" class="py-1.5 px-4 rounded-full bg-light-header shadow-sm hover:brightness-125 hover:shadow cursor-pointer">{{ t }}
            </span>
            <span 
                v-if="questions" 
                v-for="q in store.questions"
                @click="query(q)" class="py-1.5 px-4 rounded-full bg-light-header hover:brightness-125 hover:shadow cursor-pointer">{{ q }}
            </span>
        </div>
    </div>
</template>
<script setup>
import TopicIcon from './svg/TopicIcon.vue'
import QuestionIcon from './svg/QuestionIcon.vue'
import { ref } from 'vue'
import { store } from '../stores/store'

const emit = defineEmits(['simulate-run'])
const query = (example) => {
    store.query=example
    emit('simulate-run')
}
const questions = ref(false)
</script>