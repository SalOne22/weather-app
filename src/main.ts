import {
  createIcons,
  Navigation2,
  Gauge,
  Droplets,
  Sunrise,
  Sunset,
} from 'lucide';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

import {
  notFoundSection,
  searchEl,
  weeklyForecastList,
  weeklyForecastSection,
} from './ts/refs';
import { getCities, getDayWeatherForecast } from './ts/api/weatherAPI';
import makeWeatherCardMarkup from './ts/markup/weatherCard';

import './css/styles.css';

window.addEventListener('DOMContentLoaded', init);

function init() {
  searchEl!.addEventListener('input', debounce(onSearchInput, 500));
}

async function onSearchInput(evt: Event) {
  const value = (<HTMLInputElement>evt.target)!.value.trim();

  if (value === '') {
    Notify.info('Please enter a city name');
    return;
  }

  const cities = await getCities(value);

  notFoundSection!.classList.add('is-hidden');
  weeklyForecastSection!.classList.remove('is-hidden');

  if (cities.length === 0) {
    notFoundSection!.classList.remove('is-hidden');
    weeklyForecastSection!.classList.add('is-hidden');
    return;
  }

  const citiesWeather = await Promise.all(cities.map(getDayWeatherForecast));

  const weatherListMarkup = citiesWeather.reduce((markup, weatherData) => {
    if (weatherData === null) {
      Notify.failure('Failed to load city');
      return markup;
    }

    return markup.concat(makeWeatherCardMarkup(weatherData));
  }, '');

  weeklyForecastList!.innerHTML = weatherListMarkup;
  createIcons({
    icons: {
      Navigation2,
      Gauge,
      Droplets,
      Sunrise,
      Sunset,
    },
    attrs: {
      width: '16',
      height: '16',
    },
  });
}
