import { GetStaticPaths, GetStaticProps } from 'next';
import { getCitiesMap, getCityData, CityData } from '@mauriciorobayo/pyptron';
import Layout from '../../components/layout/layout';
import CategoriesTable from '../../components/categories-table/categories-table';
import CTA from '../../components/call-to-action/call-to-action';
import useDate from '../../hooks/useDate';

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
      <CategoriesTable
        cityName={cityData.name}
        categories={cityData.categories}
      />
      <CTA />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const citiesMap = getCitiesMap();
  const paths = Object.keys(citiesMap).map((key) => ({
    params: { city: key },
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
      cityData,
    },
  };
};
