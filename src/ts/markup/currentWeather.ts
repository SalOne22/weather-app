import * as dayjs from 'dayjs';

import { DayWeatherForecast } from '../types/DayWeather';
import { WeatherForecast } from '../types/WeatherForecast';
import { kelvinToCelsius, degreesToDirection } from '../utils/convert';

export function makeCurrentWeatherMarkup(
  { weather, main, visibility, wind, sys, name, timezone }: DayWeatherForecast,
  weatherForecast: WeatherForecast,
) {
  const weatherItem = weather[0];

  const temp = kelvinToCelsius(main.temp).toFixed(1);
  const feelsLikeTemp = kelvinToCelsius(main.feels_like).toFixed(1);

  const windDirection = degreesToDirection(wind.deg);

  const sunriseTime = new Date((sys.sunrise + timezone) * 1000);
  const sunsetTime = new Date((sys.sunset + timezone) * 1000);

  const visibilityDistance = (visibility / 1000).toFixed(1);

  return `<h2 class="current-weather__city">${name}, ${sys.country}</h2>
  <div class="current-weather__wrapper">
    <div class="current-weather__today">
      <h3 class="current-weather__time">Today</h3>
      <div class="weather-info">
        <img
          class="weather-info__image"
          src="https://openweathermap.org/img/wn/${weatherItem.icon}@2x.png"
          width="50"
          height="50"
          alt="${weatherItem.description} icon"
        />
        <div class="weather-info__wrapper">
          <h3 class="weather-info__title">${
            weatherItem.description
          }, ${temp}°C</h3>
          <p class="weather-info__text">Feels like ${feelsLikeTemp}°C</p>
        </div>
      </div>
      <ul class="weather-more-info">
        <li class="weather-more-info__item">
          <i
            style="transform: rotate(${wind.deg - 180}deg)"
            class="weather-more-info__icon"
            data-lucide="navigation-2"
          ></i>
          <p class="weather-more-info__text">${
            wind.speed
          }m/s ${windDirection}</p>
        </li>
        <li class="weather-more-info__item">
          <i class="weather-more-info__icon" data-lucide="gauge"></i>
          <p class="weather-more-info__text">${main.pressure}hPa</p>
        </li>
        <li class="weather-more-info__item">
          <i class="weather-more-info__icon" data-lucide="droplets"></i>
          <p class="weather-more-info__text">${main.humidity}%</p>
        </li>
        <li class="weather-more-info__item">
          <i class="weather-more-info__icon" data-lucide="sunrise"></i>
          <p class="weather-more-info__text">${sunriseTime.getHours()}:${sunriseTime.getMinutes()}</p>
        </li>
        <li class="weather-more-info__item">
          <i class="weather-more-info__icon" data-lucide="sunset"></i>
          <p class="weather-more-info__text">${sunsetTime.getHours()}:${sunsetTime.getMinutes()}</p>
        </li>
        <li class="weather-more-info__item">
          <i class="weather-more-info__icon" data-lucide="eye"></i>
          <p class="weather-more-info__text">${visibilityDistance}km</p>
        </li>
      </ul>
    </div>
    <ul class="daily-forecast">
      ${weatherForecast.list
        .map(({ dt, weather, main, visibility, wind }) => {
          const weatherItem = weather[0];

          const temp = kelvinToCelsius(main.temp).toFixed(1);
          const feelsLikeTemp = kelvinToCelsius(main.feels_like).toFixed(1);

          const windDirection = degreesToDirection(wind.deg);

          const forecastDay = dayjs.unix(dt).format('ddd, DD MMM HH:mm');

          const visibilityDistance = (visibility / 1000).toFixed(1);

          return `<li class="daily-forecast__item">
        <h3 class="daily-forecast__time">${forecastDay}</h3>
        <div class="weather-info">
          <img
            class="weather-info__image"
            src="https://openweathermap.org/img/wn/${weatherItem.icon}@2x.png"
            width="50"
            height="50"
            alt="${weatherItem.description} icon"
          />
          <div class="weather-info__wrapper">
            <h3 class="weather-info__title">${
              weatherItem.description
            }, ${temp}°C</h3>
            <p class="weather-info__text">Feels like ${feelsLikeTemp}°C</p>
          </div>
        </div>
        <ul class="weather-more-info">
          <li class="weather-more-info__item">
            <i
              style="transform: rotate(${wind.deg - 180}deg)"
              class="weather-more-info__icon"
              data-lucide="navigation-2"
            ></i>
            <p class="weather-more-info__text">${
              wind.speed
            }m/s ${windDirection}</p>
          </li>
          <li class="weather-more-info__item">
            <i class="weather-more-info__icon" data-lucide="gauge"></i>
            <p class="weather-more-info__text">${main.pressure}hPa</p>
          </li>
          <li class="weather-more-info__item">
            <i class="weather-more-info__icon" data-lucide="droplets"></i>
            <p class="weather-more-info__text">${main.humidity}%</p>
          </li>
          <li class="weather-more-info__item">
            <i class="weather-more-info__icon" data-lucide="eye"></i>
            <p class="weather-more-info__text">${visibilityDistance}km</p>
          </li>
        </ul>
      </li>`;
        })
        .join('')}
    </ul>`;
}
