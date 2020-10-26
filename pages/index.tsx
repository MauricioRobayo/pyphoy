import { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import { getCitiesMap } from '@mauriciorobayo/pyptron';
import Head from 'next/head';
import Select from '../components/select/select';

type HomeProps = {
  cities: { value: string; text: string }[];
};

export default function Home({ cities }: HomeProps) {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const [formatedDateHelpers, setFormatedDateHelpers] = useState({
    localDateString: '',
    ISODateString: '',
  });

  useEffect(() => {
    setFormatedDateHelpers({
      localDateString: currentDate.toLocaleDateString('es-CO', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      ISODateString: currentDate.toISOString(),
    });
  }, []);

  const { ISODateString, localDateString } = formatedDateHelpers;

  return (
    <>
      <Head>
        <title>
          Toda la información sobre el pico y placa en Colombia | Pico y placa
          hoy
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <h1>Pico y placa hoy</h1>
        <h2>
          <time dateTime={ISODateString}>{localDateString}</time>
        </h2>
      </header>

      <main>
        <Select id="city" name="Ciudad" options={cities} />
      </main>

      <footer>
        <p>PICO Y PLACA HOY</p>
        <p>{currentDate.getFullYear()}</p>
      </footer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const citiesMap = getCitiesMap();
  const cities = Object.values<{ key: string; name: string }>(
    citiesMap
  ).map(({ key, name }) => ({ value: key, text: name }));
  return {
    props: { cities },
  };
};
