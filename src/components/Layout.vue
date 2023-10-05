<template>
    <main class="flex lg:flex-col space-y-10 grow shrink-0 px-4 lg:px-[72px] py-8">
        <div class="container flex flex-col lg:flex-row lg:justify-between space-y-8 lg:space-y-0 lg:max-h-[82vh]">
            <div class="flex flex-col lg:w-2/3 space-y-10">
                <MessagePanel ref="comp"/>
                <ExamplesPanel @simulate-run="simulateRun()" v-if="!exampleBottomPanelActive && store.welcomePage"/>
            </div>
            <div class="flex flex-col lg:w-1/3 space-y-16">
                <SourcesPanel/>
                <ExamplesPanel @simulate-run="simulateRun()" v-if="exampleBottomPanelActive"/>
            </div>
        </div>
        <!-- <div class="flex container">
            <Episodes/>
        </div> -->
    </main>
</template>

<script setup>
import Episodes from './Episodes.vue'
import ExamplesPanel from './ExamplesPanel.vue'
import MessagePanel from './MessagePanel.vue'
import SourcesPanel from './SourcesPanel.vue'
import { ref, watch } from 'vue'
import { useResponsive } from '../window'
import { store } from '../stores/store'

const comp = ref(null)
const { width } = useResponsive()
const exampleBottomPanelActive = ref(null)

const simulateRun = () => {
    comp.value.run(store.query)
}
watch(
    () => width.value, 
    (screen) => {
        exampleBottomPanelActive.value = screen < 1024 ? true : false
    }
)

</script>