// eslint-disable-next-line import/prefer-default-export
export function getInfoFromSlug<T extends { slug: string }>(
  slug: string,
  map: T[]
): T {
  return map.find((info) => info.slug === slug) as T;
}
