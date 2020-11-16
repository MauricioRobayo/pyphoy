import { InferGetStaticPropsType } from 'next';
import { getCitiesMap2 } from '@mauriciorobayo/pyptron';
import Layout from '../components/layout/layout';
import Select from '../components/select/select';
import PypDate from '../components/date/date';

export const getStaticProps = async () => {
  const citiesMap = getCitiesMap2();
  return {
    props: {
      selectOptions: citiesMap.map(({ slug: value, name: text }) => ({
        value,
        text,
      })),
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
        <PypDate />
      </h2>
    </header>
  );

  return (
    <Layout home header={header}>
      <Select id="city" name="Ciudad" options={selectOptions} />
    </Layout>
  );
}
