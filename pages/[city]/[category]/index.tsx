import { GetStaticPaths, GetStaticProps } from 'next';
import {
  getCitiesMap,
  getCityData,
  CategoryData,
} from '@mauriciorobayo/pyptron';
import Layout from '../../../components/layout/layout';
import DaysTable from '../../../components/days-table/days-table';
import useDate from '../../../hooks/useDate';

type CategoryProps = {
  categoryData: CategoryData;
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
  const citiesMap = getCitiesMap();
  const paths: any[] = [];
  Object.entries(citiesMap).forEach(([citySlug, { categories }]) => {
    Object.keys(categories).forEach((categorySlug) => {
      paths.push({ params: { city: citySlug, category: categorySlug } });
    });
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const cityData = getCityData(params?.city as string, {
    category: params?.category as string,
    days: 7,
  });
  return {
    props: {
      cityName: cityData.name,
      categoryData: cityData.categories[params?.category as string],
    },
  };
};
