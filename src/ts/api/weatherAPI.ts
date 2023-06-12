import axios from 'axios';
import { DayWeatherForecast } from '../types/DayWeather';
import { CityCoords } from '../types/CityCoords';

const WEATHER_URL = 'https://api.openweathermap.org/data/2.5';
const GEOCODING_URL = 'http://api.openweathermap.org/geo/1.0';
const API_KEY = '4280cd81abae27c19cf46d66e1fe9782';

export async function getDayWeatherForecast({ lat, lon }: CityCoords) {
  try {
    const response = await axios.get<DayWeatherForecast>(
      `${WEATHER_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
    );

    return response.data;
  } catch (err) {
    onError(err);

    return null;
  }
}

export async function getCities(query: string, limit: number = 5) {
  try {
    const response = await axios.get<CityCoords[]>(
      `${GEOCODING_URL}/direct?q=${query}&limit=${limit}&appid=${API_KEY}`,
    );

    return response.data;
  } catch (err) {
    onError(err);

    return [];
  }
}

export async function getWeatherInCities(cities: CityCoords[]) {
  return await Promise.all(cities.map(getDayWeatherForecast));
}

function onError(err: unknown) {
  if (axios.isAxiosError(err))
    console.error('Failed to load weather: ' + err.message);
  else console.error('Unexpected error: ' + err);
}
