import { defineComponent, ref, watch, onMounted, computed } from 'vue'

export default defineComponent({
  name: 'MapApp',

  setup() {

    // Условие задачи

    //  // Реактивные переменные для хранения координат метки
    //  let x = ref(0)
    //  let y = ref(0)

    //  /**
    //   * Обработчик клика по карте для установки координат метки
    //   * @param {MouseEvent} event
    //   */
    //  function handleClick(event) {
    //    x = event.offsetX
    //    y = event.offsetY
    //  }

    //  // Следим за X и Y для установки нового положения
    //  watch([x, y], () => {
    //    // Находим метку и изменяем её положение
    //    const map = document.querySelector('.pin')
    //    map.style.left = `${x}px`
    //    map.style.top = `${y}px`
    //  })

    //  return {
    //    handleClick,
    //  }



    // Реактивные переменные для хранения координат метки
    let x = ref(0)
    let y = ref(0)


    /**
    * Обработчик клика по карте для установки координат метки
    * @param {MouseEvent} event
    */
    function handleClick(event) {
      x.value = event.offsetX
      y.value = event.offsetY
    }

    const movePin = computed(() => ({left: `${x.value}px`, top: `${y.value}px`}))

    return {
      handleClick,
      movePin
    }


  },

  template: `
    <div class="map" @click="handleClick">
      <img class="map-image" src="./map.png" alt="Map" draggable="false" />
      <span class="pin" :style="movePin">📍</span>
    </div>
  `,
})
