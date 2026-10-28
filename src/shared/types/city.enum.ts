import { CITIES } from './city.constants';

export type CityName = typeof CITIES[number]['name'];

export const CityName = Object.fromEntries(
  CITIES.map(({ name }) => [name, name])
) as Record<CityName, string>;
