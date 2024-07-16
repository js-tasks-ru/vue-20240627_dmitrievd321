import { defineComponent } from 'vue/dist/vue.esm-bundler.js'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',

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
          <div v-if="alert" class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{alert.sender_name}}: {{alert.description}}</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{geographic_name}}
            </h2>
            <div class="weather-card__time">
              {{current.dt}}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="current.weather.description">{{icons[current.weather.id]}}</div>
            <div class="weather-conditions__temp">{{(current.temp - 273.15).toFixed(1)}} °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{(current.pressure * 0.75).toFixed()}}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{current.humidity}}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{current.clouds}}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{current.wind_speed}}</div>
            </div>
          </div>
        </li>

        <!-- Пример карточки -->

        <!-- <li class="weather-card weather-card--night">
          <div class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">Королевская метеослужба короля Арагорна II: Предвещается наступление сильного шторма.</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              Гондор
            </h2>
            <div class="weather-card__time">
              07:17
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" title="thunderstorm with heavy rain">⛈️</div>
            <div class="weather-conditions__temp">15.0 °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">754</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">90</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">100</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">10.5</div>
            </div>
          </div>
        </li> -->
      </ul>
    </div>
  `,
})
