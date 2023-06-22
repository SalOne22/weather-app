/* eslint-disable @typescript-eslint/no-non-null-assertion */
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

import {
  currentWeatherSection,
  notFoundSection,
  searchEl,
  weeklyForecastList,
  weeklyForecastSection,
} from './ts/refs';
import makeWeatherListMarkup from './ts/markup/weatherList';
import {
  get5DaysWeatherForecast,
  getCities,
  getCitiesByCoords,
  getDayWeatherForecast,
  getWeatherInCities,
} from './ts/api/weatherAPI';

import './css/styles.css';
import updateLocationParams from './ts/utils/updateLocationParams';
import { makeCurrentWeatherMarkup } from './ts/markup/currentWeather';

window.addEventListener('DOMContentLoaded', init);

function init() {
  searchEl!.addEventListener('input', debounce(onSearchInput, 500));
  window.addEventListener('popstate', updateWeatherListByLocation);

  updateWeatherListByLocation();
}

function updateWeatherListByLocation() {
  if (location.search === '') {
    updateCurrentWeatherByGeolocation();
    hideSearch();
    return;
  }

  const params = new URLSearchParams(location.search);
  const query = params.get('query') ?? '';
  searchEl!.value = query;

  if (query) updateWeatherListByQuery(query);
}

function onSearchInput(evt: Event) {
  const value = (<HTMLInputElement>evt.target)!.value.trim();
  hideCurrentWeather();

  if (value === '') {
    hideSearch();
    updateLocationParams();
    return;
  }

  updateWeatherListByQuery(value);

  updateLocationParams(
    new URLSearchParams({
      query: value,
    }),
  );
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

function updateCurrentWeatherByGeolocation() {
  navigator.geolocation.getCurrentPosition(
    updateCurrentWeather,
    hideCurrentWeather,
  );
}

async function updateCurrentWeather(position: GeolocationPosition) {
  const cities = await getCitiesByCoords(
    position.coords.latitude,
    position.coords.longitude,
  );

  if (cities.length === 0) return;

  const [weather, weatherForecast] = await Promise.all([
    getDayWeatherForecast(cities[0]),
    get5DaysWeatherForecast(cities[0]),
  ]);

  if (weather === null || weatherForecast === null) return;

  const markup = makeCurrentWeatherMarkup(weather, weatherForecast);

  currentWeatherSection!.querySelector('.container')!.innerHTML = markup;
}

function hideSearch() {
  notFoundSection!.classList.add('is-hidden');
  weeklyForecastSection!.classList.add('is-hidden');
  currentWeatherSection!.classList.remove('is-hidden');
  searchEl!.value = '';
}

function hideCurrentWeather() {
  currentWeatherSection!.classList.add('is-hidden');
}
