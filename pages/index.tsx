import { InferGetStaticPropsType } from 'next';
import { getCitiesMap2 } from '@mauriciorobayo/pyptron';
import Layout from '../components/layout/layout';
import Select from '../components/select/select';
import Date from '../components/date/date';

export const getStaticProps = async () => {
  const citiesMap = getCitiesMap2();
  const selectOptions: { value: string; name: string }[] = [];
  citiesMap.forEach(({ name: cityName, categories }) => {
    categories.forEach(({ name: categoryName, path }) => {
      selectOptions.push({ value: path, name: `${cityName}/${categoryName}` });
    });
  });

  return {
    props: {
      selectOptions,
    },
  };
};

export default function Home({
  selectOptions,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const header = (
    <header>
      <h1>Pico y placa hoy</h1>
      <h2>
        <Date />
      </h2>
    </header>
  );

  return (
    <Layout home header={header}>
      <Select id="city" name="Ciudad" options={selectOptions} />
    </Layout>
  );
}
