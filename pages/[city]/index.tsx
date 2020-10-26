import { GetStaticPaths, GetStaticProps } from 'next';
import { getCitiesMap } from '@mauriciorobayo/pyptron';
import Layout from '../../components/layout/layout';

type CityProps = {
  city: string;
};

export default function City({ city }: CityProps) {
  return (
    <Layout>
      <div>{`Hello from ${city}`}</div>
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
  const city = params?.city as string;
  return {
    props: {
      city,
    },
  };
};
