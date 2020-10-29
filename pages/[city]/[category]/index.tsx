import { GetStaticPaths, GetStaticProps } from 'next';
import { getCitiesMap, getCityData, CityData } from '@mauriciorobayo/pyptron';
import Layout from '../../../components/layout/layout';
import CategoriesTable from '../../../components/categories-table/categories-table';
import useDate from '../../../hooks/useDate';

export default function City({ cityData }: { cityData: CityData }) {
  const { localDateString } = useDate();
  const header = (
    <header>
      <h1>{`Pico y placa ${cityData.name}`}</h1>
      <h2>{localDateString}</h2>
    </header>
  );

  return (
    <Layout header={header}>
      <CategoriesTable categories={cityData.categories} />
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
      cityData,
    },
  };
};
