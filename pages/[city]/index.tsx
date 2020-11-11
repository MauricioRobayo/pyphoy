import { GetStaticPaths, GetStaticProps } from 'next';
import { getCitiesMap2, getCityData, ICityData } from '@mauriciorobayo/pyptron';
import Layout from '../../components/layout/layout';
import CategoriesList from '../../components/categories-list/categories-list';
import useDate from '../../hooks/useDate';

type CityProps = {
  cityData: ICityData;
};

export default function City({ cityData }: CityProps) {
  const { localDateString } = useDate();
  const header = (
    <header>
      <h1>{`Pico y placa ${cityData.name}`}</h1>
      <h2>{localDateString}</h2>
    </header>
  );

  return (
    <Layout header={header}>
      <CategoriesList categories={cityData.categories} />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const citiesMap = getCitiesMap2();
  return {
    paths: citiesMap.map(({ slug }) => ({ params: { city: slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const cityData = getCityData(params?.city as string);
  return {
    props: {
      cityData,
    },
  };
};
