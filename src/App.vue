<template>
    <div class="flex flex-col h-screen bg-light-bg-primary" 
    :class="{ 'overflow-hidden': store.videoPlayer  }">
        <Header/>
        <Layout/>
        <Modal/>
        <YoutubePlayer/>
    </div>
</template>



<script setup>
import Header from "./components/Header.vue"
import Layout from "./components/Layout.vue"
import Modal from "./components/Modal.vue"
import YoutubePlayer from "./components/YoutubePlayer.vue"

import { store } from './stores/store'
</script>
