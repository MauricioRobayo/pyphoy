import { GetStaticPaths, GetStaticProps } from 'next';
import { getCitiesMap, getCityData, CityData } from '@mauriciorobayo/pyptron';
import Layout from '../../components/layout/layout';

export default function City({ cityData }: { cityData: CityData }) {
  return (
    <Layout>
      <div>{`Hello from ${cityData.name}`}</div>
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
