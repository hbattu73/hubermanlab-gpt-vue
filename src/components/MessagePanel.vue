<template>
    <div class="flex flex-col space-y-8 min-w-full"
        :class="{'overflow-y-auto': !store.welcomePage}">
        <div class="flex sticky top-0 font-geologica font-light text-xl z-20">
            <SearchIcon class="absolute w-6 h-6 top-1/2 -translate-y-1/2 left-6 fill-current text-neutral-500 z-30"/>
            <input
                @keyup.enter="run()"
                v-model="store.query"
                class="w-full py-3 pl-16 pr-10 rounded text-primary bg-light-bg-primary/90 backdrop-blur focus:outline-none border-1 border-blue-300 placeholder:text-neutral-500 shadow appearance-none"
                placeholder="Ask me stuff."
                autofocus
                maxlength="96"
            />
            <button @click="run()" class="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer drop-shadow-lg hover:scale-110 duration-75">
                <EnterIcon class="w-8 h-8 fill-current text-primary/90"/>
            </button>
        </div>
        <div class="min-h-[232px] 2xl:min-h-[312px] flex shrink-0 relative pt-4 pb-12 px-4 rounded-md border-1 border-neutral-300">
            <div class="hidden relative md:flex md:flex-col shrink-0">
                <img src="../assets/huberman.png" class="w-[120px] h-[120px] lg:w-32 lg:h-32 xl:w-36 xl:h-36 2xl:w-48 2xl:h-48 rounded-md border-1 border-stone-200 shadow-md"/>
                <div class="absolute top-[124px] lg:top-[136px] xl:top-[152px] 2xl:top-[200px] flex flex-col space-y-1.5 py-1 w-full">
                    <a href="https://openai.com/" target="_blank" class="inline-flex items-center space-x-1 py-1.5 border-1 justify-center shadow rounded bg-gray-200 opacity-80 border-gray-300 border- 1 hover:opacity-100 cursor-pointer">
                        <GPTIcon class="w-4 h-4 2xl:w-5 2xl:h-5"/>
                        <span class="font-inter text-[10px] xl:text-xs 2xl:text-base font-medium">Powered by OpenAI</span>
                    </a>
                    <!-- <div class="inline-flex items-center space-x-1 py-1.5 border-1 justify-center shadow rounded bg-[#02007f] border-blue-800 opacity-80 hover:opacity-100 cursor-pointer">
                        <PineconeIcon class="w-4 h-4 2xl:w-5 2xl:h-5"/>
                        <span class="font-inter text-[10px] xl:text-xs 2xl:text-base font-medium text-slate-100">Built with Pinecone</span>
                    </div> -->
                </div>

            </div>
            <div class="flex grow">
                <div class="pl-2 md:pl-6 flex flex-col font-geologica">
                    <div class="inline-flex items-end space-x-2">
                        <BotIcon class="w-7 h-7 2xl:w-8 2xl:h-8 drop-shadow-lg"/>
                        <h3 class="font-medium lg:text-base xl:text-lg 2xl:text-xl xl:leading-6 text-primary">hubermanGPT:</h3>
                    </div>
                    <div v-show="store.loading" class="pl-4 flex py-4">
                        <div class="dot-flashing"></div>
                    </div>
                    <div v-show="!store.loading" class="py-2 flex flex-col text-gray-700 font-extralight">
                        <p v-show="store.welcomePage" class="lg:text-sm xl:text-base 2xl:text-lg">Welcome to hubermanGPT!</p>
                        <span class="lg:text-sm xl:text-base 2xl:text-lg">{{ store.message }}</span>
                    </div>
                    <div class="flex absolute bottom-4">
                        <p class="tracking-wide text-xs lg:text-[10px] xl:text-xs 2xl:text-sm font-lato font-semibold text-primary">This does not replace professional medical advice. Please read this <a class="text-sky-700 underline underline-offset-2" href="https://hubermanlab.com/disclaimer/" target="_blank" rel="noopener noreferrer">disclaimer</a>.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import SearchIcon from './svg/SearchIcon.vue'
import BotIcon from './svg/BotIcon.vue'
import EnterIcon from './svg/EnterIcon.vue'
import GPTIcon from './svg/GPTIcon.vue'
import PineconeIcon from './svg/PineconeIcon.vue'

import { fetchEventSource } from '@microsoft/fetch-event-source'
import { store } from '../stores/store'

const run = async () => {
    store.loading = true 
    store.message = ''
    store.welcomePage = false
    const ctrl = new AbortController() 
    await fetchEventSource("https://3ukak3eoigscdcxb5rn7izajei0lkcum.lambda-url.us-west-1.on.aws/query", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            text: store.query
        }),
        openWhenHidden: true,
        signal: ctrl.signal,
        onopen: async (res) => {
            const contentType = res.headers.get("content-type")
            if (Boolean(contentType) && contentType.indexOf("application/json") >= 0) {
                throw await res.json()
            }
        },
        onerror: (err) => {
            if (Boolean(err)) {
                console.log("Fetch EventSource Error: ", err)
                store.message = err["detail"] ? err["detail"] : "Server Error."
            }
            store.loading = false
            throw err
        },
        onmessage: async(ev) => {
            const data = ev.data
            const event = ev.event
            if (!data || event === "close") {
                return
            }
            try {
                store.loading = false
                // actual response
                if (event === "gpt-response") {
                    const d = JSON.parse(data)
                    const delta = d["choices"][0]["delta"]
                    const token = delta["content"] ? delta["content"] : ""
                    store.message += token
                }
                // passages
                else if (event === "passages") {
                    const passages = JSON.parse(data)
                    // console.log(passages)
                    store.setPassages(passages)
                    // console.log(JSON.parse(data))
                }
                // error
                else {
                    store.message = data
                }
            }
            catch (err) {
                console.log("Fetch EventSource Message Error: ", err)
            }
        }
    });

}

defineExpose({
    run,  
})
</script>

<style scoped>
.dot-flashing {
    position: relative;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #94a3b8;
    color: #94a3b8;
    animation: dot-flashing 1s infinite linear alternate;
    animation-delay: 0.5s;
}
.dot-flashing::before, .dot-flashing::after {
    content: "";
    display: inline-block;
    position: absolute;
    top: 0;
}
.dot-flashing::before {
    left: -15px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #94a3b8;
    color: #94a3b8;
    animation: dot-flashing 1s infinite alternate;
    animation-delay: 0s;
}
.dot-flashing::after {
    left: 15px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #94a3b8;
    color: #94a3b8;
    animation: dot-flashing 1s infinite alternate;
    animation-delay: 1s;
}

@keyframes dot-flashing {
    0% {
        background-color: #94a3b8;
    }
    50%, 100% {
        background-color: #cbd5e1;
    }
}
</style>