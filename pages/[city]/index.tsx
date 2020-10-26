import { GetStaticPaths, GetStaticProps } from 'next';
import { getCitiesMap } from '@mauriciorobayo/pyptron';

type CityProps = {
  city: string;
};

export default function City({ city }: CityProps) {
  return <div>{`Hello from ${city}`}</div>;
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
