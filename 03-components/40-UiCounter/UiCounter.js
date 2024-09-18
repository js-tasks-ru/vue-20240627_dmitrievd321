import { defineComponent } from 'vue'
import { UiButton } from '@shgk/vue-course-ui'
import './UiCounter.css'

export default defineComponent({
  name: 'UiCounter',

  components: {
    UiButton,
  },

  props: {
    count: {
      type: Number,
      required: true,
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: Infinity
    },
  },

  emits: ['update:count'],

  setup(props, { emit }) {
    // Рекомендуется для практики реализовать обработку событий внутри setup, а не непосредственно в шаблоне

    function decrement() {
      emit('update:count', props.count - 1);
    }

    function increment() {
      emit('update:count', props.count + 1)
    }

    return {
      decrement,
      increment
    }
  },

  // template: `
  //   <div class="counter">
  //     <UiButton aria-label="Decrement" disabled>➖</UiButton>
  //     <span class="count" data-testid="count">3</span>
  //     <UiButton aria-label="Increment">➕</UiButton>
  //   </div>
  // `,

  template: `
  <div class="counter">
    <UiButton aria-label="Decrement" @click="decrement" :disabled="count <= min">➖</UiButton>
    <span class="count" data-testid="count">{{ count }}</span>
    <UiButton aria-label="Increment" @click="increment" :disabled="count >= max">➕</UiButton>
  </div>
`,
})
