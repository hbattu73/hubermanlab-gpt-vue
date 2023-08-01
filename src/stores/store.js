import { reactive } from "vue"

export const store = reactive({
    welcomePage: true,
    query: '',
    loading: false,
    modalIdx: -1,
    passages: [],
    message: "I'm an AI agent trained on episodes from the Huberman Lab podcast. You can search for health-related topics, look up specific science-based protocols, and ask any questions pertaining to information mentioned in the podcast. Type in your query above and I'll handle the rest!",
    topics: ['ADHD', 'Dopamine', 'The Science Behind Love', 'Neuroplasticity', 'NSDR', 'Psychedelics', 'Caffeine', 'Hair Loss', 'Effects of Alcohol Consumption', 'SSRIS', 'Meditation', 'Sunlight Exposure', 'Managing Stress and Anxiety', 'Fatty Acids', 'Muscle Recovery and Growth'],
    questions: ['Pros and cons of using SSRIs?', 'How to get more optimal sleep?', 'Can I increase my longevity?', 'Are psychedelics effective in treating depression?', 'What does cannabis do to my body?', 'Benefits of cold exposure?', 'Science-based ways to lose fat?', 'How can I improve my focus?'],
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