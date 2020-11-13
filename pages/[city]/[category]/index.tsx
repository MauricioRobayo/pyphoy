import { GetStaticPaths, GetStaticProps } from 'next';
import {
  getCitiesMap2,
  getCityData,
  ICategoryData,
  ICategoryMap2,
  ICityMap2,
} from '@mauriciorobayo/pyptron';
import Layout from '../../../components/layout/layout';
import DaysList from '../../../components/days-list/days-list';
import useDate from '../../../hooks/useDate';

type CategoryProps = {
  categoryData: ICategoryData;
  cityName: string;
};

export default function Category({ categoryData, cityName }: CategoryProps) {
  const { localDateString } = useDate();
  const header = (
    <header>
      <h1>{`Pico y placa ${categoryData.name.toLowerCase()} en ${cityName}`}</h1>
      <h2>{localDateString}</h2>
    </header>
  );

  return (
    <Layout header={header}>
      <DaysList categoryData={categoryData} />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const citiesMap = getCitiesMap2();
  return {
    paths: citiesMap
      .map(({ slug: citySlug, categories }) => {
        return categories.map(({ slug: categorySlug }) => {
          return { params: { city: citySlug, category: categorySlug } };
        });
      })
      .flat(),
    fallback: false,
  };
};

function getInfoFromSlug<T extends { slug: string }>(
  slug: string,
  map: T[]
): T {
  return map.find((info) => info.slug === slug) as T;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const citySlug = params?.city as string;
  const categorySlug = params?.category as string;
  const citiesMap = getCitiesMap2();
  const { name: cityName, categories: categoriesMap } = getInfoFromSlug<
    ICityMap2
  >(citySlug, citiesMap);
  const { key: categoryKey } = getInfoFromSlug<ICategoryMap2>(
    categorySlug,
    categoriesMap
  );
  const categoryData = getCityData(citySlug, {
    category: categorySlug,
    days: 8,
  }).categories[categoryKey];
  return {
    props: {
      cityName,
      categoryData,
    },
  };
};