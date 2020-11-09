import { GetStaticPaths, GetStaticProps } from 'next';
import { getCitiesMap, getCityData, ICityData } from '@mauriciorobayo/pyptron';
import Layout from '../../components/layout/layout';
import CategoriesTable from '../../components/categories-list/categories-list';
import useDate from '../../hooks/useDate';

type CityProps = {
  citySlug: string;
  cityData: ICityData;
};

export default function City({ citySlug, cityData }: CityProps) {
  const { localDateString } = useDate();
  const header = (
    <header>
      <h1>{`Pico y placa ${cityData.name}`}</h1>
      <h2>{localDateString}</h2>
    </header>
  );

  return (
    <Layout header={header}>
      <CategoriesTable categories={cityData.categories} citySlug={citySlug} />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const citiesMap = getCitiesMap();
  const paths = Object.keys(citiesMap).map((citySlug) => ({
    params: { city: citySlug },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const cityData = getCityData(params?.city as string);
  return {
    props: {
      citySlug: params?.city as string,
      cityData,
    },
  };
};
