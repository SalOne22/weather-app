import axios from 'axios';
import { DayWeatherForecast } from '../types/DayWeather';
import { CityCoords } from '../types/CityCoords';
import { onError } from '../utils/onError';

type GetDayWeatherForecast = {
  data: DayWeatherForecast;
};

type GetCitiesCoords = {
  data: CityCoords[];
};

const WEATHER_URL = 'https://api.openweathermap.org/data/2.5';
const GEOCODING_URL = 'http://api.openweathermap.org/geo/1.0';
const API_KEY = '4280cd81abae27c19cf46d66e1fe9782';

export async function getDayWeatherForecast(lat: number, lon: number) {
  try {
    const response = await axios.get<GetDayWeatherForecast>(
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
    const response = await axios.get<GetCitiesCoords>(
      `${GEOCODING_URL}/direct?q=${query}&limit=${limit}&appid=${API_KEY}`,
    );

    return response.data;
  } catch (err) {
    onError(err);

    return null;
  }
}
