import { GetStaticPaths, GetStaticProps } from 'next';
import {
  getCitiesMap2,
  getCityData2,
  ICityData2,
} from '@mauriciorobayo/pyptron';
import Layout from '../../components/layout/layout';
import CategoriesList from '../../components/categories-list/categories-list';
import PypDate from '../../components/date/date';
import { getInfoFromSlug } from '../../utils/utils';

type CityProps = {
  cityData: ICityData2;
};

export default function City({ cityData }: CityProps) {
  const header = (
    <header>
      <h1>{`Pico y placa ${cityData.name}`}</h1>
      <h2>
        <PypDate />
      </h2>
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
  const citySlug = params?.city as string;
  const { key: cityKey } = getInfoFromSlug(citySlug, getCitiesMap2());
  const cityData = getCityData2(cityKey);
  return {
    props: {
      cityData,
    },
  };
};
