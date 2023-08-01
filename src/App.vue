<template>
    <div class="flex flex-col min-h-screen bg-light-bg-primary">
        <Header/>
        <Layout/>
        <Modal/>
    </div>
</template>



<script setup>
import Header from "./components/Header.vue"
import Layout from "./components/Layout.vue"
import Modal from "./components/Modal.vue"
</script>
