import { reactive } from "vue"

export const store = reactive({
    welcomePage: true,
    query: '',
    loading: false,
    modalIdx: -1,
    passages: [],
    message: "I'm an AI agent trained on episodes from the Huberman Lab podcast. You can search for health-related topics, look up specific science-based protocols, and ask any questions pertaining to information mentioned in the podcast. Type in your query above and I'll handle the rest!",
    topics: ['ADHD', 'Dopamine', 'Love', 'Neuromodulators', 'Yoga', 'Psychedelics', 'LSD', 'Hair Loss', 'Effects of Alcohol Consumption', 'SSRIS', 'Meditation', 'Sunlight Exposure', 'Caffeine', 'Stress and Anxiety', 'Fatty Acids'],
    questions: ['Pros and cons of using SSRIs?', 'How can I get more optimal sleep?', 'What is neuroplasticity?', 'Are psychedelics effective in treating depression?', 'Benefits of cold exposure?'],
    sourceCapabilites: ["Sorted by semantic similarity to your search query", "Linked to the exact timestamp YouTube URL of the audio segment", "Transcribed into text from the original segment courtesy of OpenAI's Whisper"],
    setPassages(passages) {
        this.passages = passages
        console.log(this.passages)
    },
    resetState() {
        this.welcomePage = true
        this.query = ''
        this.loading = false
        this.modalIdx = -1
        this.passages = []
        this.message = "I'm an AI agent trained on episodes from the Huberman Lab podcast. You can search for health-related topics, look up specific science-based protocols, and ask any questions pertaining to information mentioned in the podcast. Type in your query above and I'll handle the rest!"
        console.log(this.modalIdx)
    }
})