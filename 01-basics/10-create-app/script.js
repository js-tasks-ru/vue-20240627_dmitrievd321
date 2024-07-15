import { defineComponent, createApp } from 'vue/dist/vue.esm-bundler.js'

const App = defineComponent({

  name: 'App',


  setup() {
    const todaysDate = new Date().toLocaleDateString(navigator.language, { dateStyle: 'long' })

    return {
        todaysDate
    }
  },

  template: `<div>Сегодня {{ todaysDate }}</div>`,
})


createApp(App).mount('#app')