export function kelvinToCelsius(kelvin: number) {
  return kelvin - 272.15;
}

export function kelvinToFahrenheit(kelvin: number) {
  return (kelvin * 9) / 5 - 459.67;
}

export function degreesToDirection(degree: number) {
  if (degree >= 348.75) {
    return 'N';
  }
  if (degree >= 281.25) {
    return 'NW';
  }
  if (degree >= 258.75) {
    return 'W';
  }
  if (degree >= 191.25) {
    return 'SW';
  }
  if (degree >= 168.75) {
    return 'S';
  }
  if (degree >= 101.25) {
    return 'SE';
  }
  if (degree >= 78.75) {
    return 'E';
  }
  if (degree >= 11.25) {
    return 'NE';
  }

  return 'N';
}
