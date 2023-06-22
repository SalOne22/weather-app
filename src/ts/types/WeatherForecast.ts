import { DayWeatherForecast } from './DayWeather';

export interface WeatherForecast {
  cod: number;
  message: number;
  cnt: number;
  list: DayWeatherForecast[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}
