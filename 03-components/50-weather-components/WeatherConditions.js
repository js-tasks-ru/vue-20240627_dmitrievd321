import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WeatherConditions',

  props: {
    title: {
      type: String,
      required: true,
    },
    icons: {
      type: String,
      required: true,
    },
    temp: {
      type: String,
      required: true,
    },
  },

  template: `
    <div class="weather-conditions">
      <div class="weather-conditions__icon" :title="title">{{icons}}</div>
      <div class="weather-conditions__temp">{{ temp }} °C</div>
    </div>
  `,
})
