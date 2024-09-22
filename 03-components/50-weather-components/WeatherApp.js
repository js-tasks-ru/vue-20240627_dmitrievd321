import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'
import WeatherTop from './WeatherTop.js'
import WeatherAlert from './WeatherAlert.js'
import WeatherConditions from './WeatherConditions.js'
import WeatherDetailsItem from './WeatherDetailsItem.js'
import './WeatherApp.css'

export default defineComponent({
  name: 'WeatherApp',

  components: {
    WeatherTop,
    WeatherAlert,
    WeatherConditions,
    WeatherDetailsItem
  },

  setup() {
    const cards = getWeatherData();
    const icons = WeatherConditionIcons;

    function timeToNum(timeStr) {
      return +timeStr.split(':').join('');
    }

    return {
      cards,
      icons,
      timeToNum
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <li class="weather-card" :class="{'weather-card--night': timeToNum(current.sunset) < timeToNum(current.dt) || timeToNum(current.dt) < timeToNum(current.sunrise)}" v-for="{alert, geographic_name, current} in cards">
          <WeatherAlert v-if="alert" :sender="alert.sender_name" :description="alert.description" />
          <WeatherTop :name="geographic_name" :time="current.dt" />
          <WeatherConditions :temp="(current.temp - 273.15).toFixed(1)" :title="current.weather.description" :icons="icons[current.weather.id]" />
          <div class="weather-details">
            <WeatherDetailsItem label="Давление, мм рт. ст." :value="(current.pressure * 0.75).toFixed()" />
            <WeatherDetailsItem label="Влажность, %" :value="current.humidity" />
            <WeatherDetailsItem label="Облачность, %" :value="current.clouds" />
            <WeatherDetailsItem label="Ветер, м/с" :value="current.wind_speed" />
          </div>
        </li>
      </ul>
    </div>
  `,

  // Условие

  // template: `
  //   <div>
  //     <h1 class="title">Погода в Средиземье</h1>

  //     <ul class="weather-list unstyled-list">
  //       <li class="weather-card weather-card--night">
  //         <div class="weather-alert">
  //           <span class="weather-alert__icon">⚠️</span>
  //           <span class="weather-alert__description">Королевская метеослужба короля Арагорна II: Предвещается наступление сильного шторма.</span>
  //         </div>
  //         <div>
  //           <h2 class="weather-card__name">
  //             Гондор
  //           </h2>
  //           <div class="weather-card__time">
  //             07:17
  //           </div>
  //         </div>
  //         <div class="weather-conditions">
  //           <div class="weather-conditions__icon" title="thunderstorm with heavy rain">⛈️</div>
  //           <div class="weather-conditions__temp">15.0 °C</div>
  //         </div>
  //         <div class="weather-details">
  //           <div class="weather-details__item">
  //             <div class="weather-details__item-label">Давление, мм рт. ст.</div>
  //             <div class="weather-details__item-value">754</div>
  //           </div>
  //           <div class="weather-details__item">
  //             <div class="weather-details__item-label">Влажность, %</div>
  //             <div class="weather-details__item-value">90</div>
  //           </div>
  //           <div class="weather-details__item">
  //             <div class="weather-details__item-label">Облачность, %</div>
  //             <div class="weather-details__item-value">100</div>
  //           </div>
  //           <div class="weather-details__item">
  //             <div class="weather-details__item-label">Ветер, м/с</div>
  //             <div class="weather-details__item-value">10.5</div>
  //           </div>
  //         </div>
  //       </li>
  //     </ul>
  //   </div>
  // `,
})