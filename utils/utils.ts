export const ALL_DIGITS = 'Todos';
export const NA = 'No aplica';

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
  return array.reduce((formatedList, listElement, index) => {
    if (index === 0) {
      return listElement.toLowerCase();
    }
    if (index === array.length - 1) {
      return `${formatedList} y ${listElement.toLowerCase()}`;
    }
    return `${formatedList}, ${listElement.toLowerCase()}`;
  }, '');
}

export function isPublicLicense(categoryName: string) {
  const lowerCaseName = categoryName.toLowerCase();
  return ['taxis', 'público'].some((category) =>
    lowerCaseName.includes(category)
  );
}
