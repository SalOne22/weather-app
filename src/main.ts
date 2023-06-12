import {
  createIcons,
  Navigation2,
  Gauge,
  Droplets,
  Sunrise,
  Sunset,
  Eye,
} from 'lucide';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

import {
  notFoundSection,
  searchEl,
  weeklyForecastList,
  weeklyForecastSection,
} from './ts/refs';
import makeWeatherListMarkup from './ts/markup/weatherList';
import { getCities, getWeatherInCities } from './ts/api/weatherAPI';

import './css/styles.css';

window.addEventListener('DOMContentLoaded', init);

function init() {
  searchEl!.addEventListener('input', debounce(onSearchInput, 500));
}

function onSearchInput(evt: Event) {
  const value = (<HTMLInputElement>evt.target)!.value.trim();

  if (value === '') {
    Notify.info('Please enter a city name');
    return;
  }

  updateWeatherListByQuery(value);
}

async function updateWeatherListByQuery(query: string) {
  const cities = await getCities(query);

  notFoundSection!.classList.add('is-hidden');
  weeklyForecastSection!.classList.remove('is-hidden');

  if (cities.length === 0) {
    notFoundSection!.classList.remove('is-hidden');
    weeklyForecastSection!.classList.add('is-hidden');
    return;
  }

  const citiesWeather = await getWeatherInCities(cities);

  const weatherListMarkup = makeWeatherListMarkup(citiesWeather);

  updateWeatherList(weatherListMarkup);
}

function updateWeatherList(markup: string) {
  weeklyForecastList!.innerHTML = markup;

  createIcons({
    icons: {
      Navigation2,
      Gauge,
      Droplets,
      Sunrise,
      Sunset,
      Eye,
    },
    attrs: {
      width: '16',
      height: '16',
    },
  });
}
