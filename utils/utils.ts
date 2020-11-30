import { getCitiesMap2 } from '@mauriciorobayo/pyptron';

export const ALL_DIGITS = 'Todos';
export const NA = 'No aplica';
export const ALL_DAY = 'Todo el día';

export enum Scheme {
  LastNumber,
  FirstNumber,
}

export function getPypOptions() {
  const citiesMap = getCitiesMap2();
  const pypOptions: { value: string; name: string }[] = [];
  citiesMap.forEach(({ name: cityName, categories }) => {
    categories.forEach(({ name: categoryName, path }) => {
      pypOptions.push({
        value: path,
        name: `${cityName} / ${categoryName}`,
      });
    });
  });
  return pypOptions;
}

export function getInfoFromSlug<T extends { slug: string }>(
  slug: string,
  map: T[]
): T {
  return map.find((info) => info.slug === slug) as T;
}

export function hasAllDigits(numbers: number[]) {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].every((num) => numbers.includes(num));
}

export function pypNumbersToString(numbers: number[]) {
  if (numbers.length === 0) {
    return NA;
  }

  if (hasAllDigits(numbers)) {
    return ALL_DIGITS;
  }

  return numbers.join('-');
}

export function listFormat(array: string[]) {
  return array
    .reduce((formatedList, listElement, index) => {
      if (index === 0) {
        return listElement.toLowerCase();
      }
      if (index === array.length - 1) {
        return `${formatedList} y ${listElement.toLowerCase()}`;
      }
      return `${formatedList}, ${listElement.toLowerCase()}`;
    }, '')
    .replace(/\.$/, '');
}

export function isPublicLicense(categoryName: string) {
  const lowerCaseName = categoryName.toLowerCase();
  return ['taxis', 'público'].some((category) =>
    lowerCaseName.includes(category)
  );
}

export function isEmptyArray(array: [string, string] | []): array is [] {
  return array.length === 0;
}
