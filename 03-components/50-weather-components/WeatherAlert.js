import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WeatherAlert',

  props: {
    sender: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },

  template: `
    <div class="weather-alert">
      <span class="weather-alert__icon">⚠️</span>
      <span class="weather-alert__description">{{ sender }}: {{ description }}</span>
    </div>
  `,
})
