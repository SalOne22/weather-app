export const searchEl = <HTMLInputElement | null>(
  document.getElementById('search')
);
export const notFoundSection = document.querySelector('.not-found');

export const weeklyForecastSection =
  document.querySelector('.weather-forecast');
export const weeklyForecastList =
  weeklyForecastSection?.querySelector('.weather-forecast__list') ?? null;
