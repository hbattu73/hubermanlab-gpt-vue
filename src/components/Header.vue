<template>
    <header class="sticky top-0 bg-slate-700 backdrop-blur z-50">
        <!-- Nav -->
        <nav class="flex items-center h-14 md:h-16 py-4 px-4 lg:px-16 border-b-1 border-slate-300">       
            <div class="flex items-center container justify-between">
                <!-- Logo -->
                <div class="flex group cursor-pointer">
                    <button @click="store.resetState()" class="inline-flex space-x-2 items-end">
                        <BrainIcon class="drop-shadow-md group-hover:scale-110 group-hover:drop-shadow-lg w-8 h-8 group-hover:duration-300"/>
                        <span class="font-geologica font-semibold text-2xl text-light-bg-primary group-hover:brightness-90 group-hover:duration-300">hubermanGPT</span>
                    </button>
                </div>
                <!-- Huberman Lab Link -->
                <div class="flex items-center">
                    <a href="https://hubermanlab.com/" target="_blank" class="flex items-center space-x-5 pr-4 border-slate-400 border-r-1">
                        <button class="group inline-flex cursor-pointer space-x-1 items-center">
                            <span class="hidden md:block font-geologica text-light-bg-primary font-medium text-sm group-hover:brightness-90 group-hover:duration-300">Huberman Lab</span>
                            <PodcastIcon class="w-7 h-7 md:w-6 md:h-6 drop-shadow group-hover:scale-110 group-hover:duration-300"/>
                        </button>
                    </a>
                    <a href="https://github.com/hbattu73/hubermanlab-gpt-vue.git" target="_blank" class="flex items-center pl-4">
                        <button class="cursor-pointer hover:scale-110 duration-300">
                            <GithubIcon class="w-7 h-7 md:w-6 md:h-6 drop-shadow fill-current text-light-bg-primary"/>
                        </button>
                    </a>
                </div>
            </div>
        </nav>
    </header>
</template>

<script setup>
// Icons
import GithubIcon from './svg/GithubIcon.vue'
import BrainIcon from './svg/BrainIcon.vue'
import PodcastIcon from './svg/PodcastIcon.vue'
import { store } from '../stores/store'
</script>