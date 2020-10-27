import { useState, useEffect } from 'react';
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
  const date = new Date();
  date.setHours(0, 0, 0, 0);

  const [ISODateString, setISODateString] = useState('');
  const [localDateString, setLocalDateString] = useState('');

  useEffect(() => {
    setISODateString(date.toISOString());
    setLocalDateString(
      date.toLocaleDateString('es-CO', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    );
  });

  const header = (
    <header>
      <h1>Pico y placa hoy</h1>
      <h2>
        <time dateTime={ISODateString}>{localDateString}</time>
      </h2>
    </header>
  );

  return (
    <Layout home header={header}>
      <Select id="city" name="Ciudad" options={selectOptions} />
    </Layout>
  );
}
