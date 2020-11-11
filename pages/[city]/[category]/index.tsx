import { GetStaticPaths, GetStaticProps } from 'next';
import {
  getCitiesMap2,
  getCityData,
  ICategoryData,
  ICategoryMap2,
} from '@mauriciorobayo/pyptron';
import Layout from '../../../components/layout/layout';
import DaysTable from '../../../components/days-table/days-table';
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
      <DaysTable categoryData={categoryData} />
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const citySlug = params?.city as string;
  const categorySlug = params?.category as string;
  const citiesMap = getCitiesMap2();
  const cityInfo = citiesMap.find(({ slug }) => slug === citySlug);
  const { key: categoryKey } = cityInfo?.categories.find(
    ({ slug }) => slug === categorySlug
  ) as ICategoryMap2;
  const cityData = getCityData(citySlug, { category: categorySlug, days: 8 });

  return {
    props: {
      cityName: cityInfo?.name,
      categoryData: cityData.categories[categoryKey],
    },
  };
};
