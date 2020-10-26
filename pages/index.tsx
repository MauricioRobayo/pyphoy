import { GetStaticProps } from 'next';
import { getCitiesMap, CityMap } from '@mauriciorobayo/pyptron';
import Layout from '../components/layout/layout';
import Select from '../components/select/select';

type HomeProps = {
  citiesMap: Record<string, CityMap>;
};

export default function Home({ citiesMap }: HomeProps) {
  const selectOptions = Object.entries(
    citiesMap
  ).map(([value, { name: text }]) => ({ value, text }));

  return (
    <Layout home>
      <Select id="city" name="Ciudad" options={selectOptions} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: { citiesMap: getCitiesMap() },
  };
};
