import { InferGetStaticPropsType } from 'next';
import { getCitiesMap } from '@mauriciorobayo/pyptron';
import Layout from '../components/layout/layout';
import Select from '../components/select/select';

export const getStaticProps = async () => {
  const citiesMap = getCitiesMap();
  const selectOptions = Object.entries(
    citiesMap
  ).map(([value, { name: text }]) => ({ value, text }));
  return {
    props: {
      selectOptions,
    },
  };
};

export default function Home({
  selectOptions,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout home>
      <Select id="city" name="Ciudad" options={selectOptions} />
    </Layout>
  );
}
