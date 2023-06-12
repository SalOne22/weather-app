import { Notify } from 'notiflix';

import { DayWeatherForecast } from '../types/DayWeather';
import makeWeatherCardMarkup from './weatherCard';

export default function makeWeatherListMarkup(
  citiesWeather: (DayWeatherForecast | null)[],
) {
  return citiesWeather.reduce((markup, weatherData) => {
    if (weatherData === null) {
      Notify.failure('Failed to load city');
      return markup;
    }

    return markup.concat(makeWeatherCardMarkup(weatherData));
  }, '');
}
