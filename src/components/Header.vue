<template>
    <!-- bg-light-bg-primary/80 -->
    <header class="sticky top-0 bg-light-header backdrop-blur z-50">
        <!-- Nav -->
        <nav class="flex items-center h-14 md:h-16 py-4 px-4 lg:px-16 border-b-1 border-slate-300">       
            <div class="flex items-center container">
                <!-- Logo -->
                <button @click="store.resetState()" class="group inline-flex flex-1 space-x-2 items-end cursor-pointer">
                    <BrainIcon class="drop-shadow-md group-hover:scale-110 group-hover:drop-shadow-lg w-8 h-8 group-hover:duration-300"/>
                    <span class="font-geologica font-semibold text-2xl text-light-bg-primary group-hover:brightness-90 group-hover:duration-300">hubermanGPT</span>
                </button>
                <!-- Huberman Lab Link -->
                <div class="flex items-center">
                    <a href="https://hubermanlab.com/" target="_blank" class="flex items-center space-x-5 pr-4 border-slate-400 border-r-1">
                        <button class="group inline-flex cursor-pointer space-x-1 items-center">
                            <span class="hidden md:block font-geologica text-light-bg-primary font-medium text-sm group-hover:brightness-90 group-hover:duration-300">Huberman Lab</span>
                            <PodcastIcon class="w-7 h-7 md:w-6 md:h-6 drop-shadow group-hover:scale-110 group-hover:duration-300"/>
                        </button>
                    </a>
                    <div class="flex items-center pl-4">
                        <button class="cursor-pointer hover:scale-110 duration-300">
                            <GithubIcon class="w-7 h-7 md:w-6 md:h-6 drop-shadow fill-current text-light-bg-primary"/>
                        </button>
                    </div>
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