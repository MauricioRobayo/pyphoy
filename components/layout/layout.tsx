import { useEffect, useState, ReactNode } from 'react';
import Head from 'next/head';

type LayoutProps = {
  children: ReactNode;
  home?: boolean;
};

export default function Layout({ children, home }: LayoutProps) {
  const date = new Date();
  date.setHours(0, 0, 0, 0);

  const [year, setYear] = useState(date.getFullYear());
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
    setYear(date.getFullYear());
  });

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
        {home ? (
          <>
            <h1>Pico y placa hoy</h1>
            <h2>
              <time dateTime={ISODateString}>{localDateString}</time>
            </h2>
          </>
        ) : (
          <img src="/pyphoy-logo.svg" alt="Pyphoy logo" />
        )}
      </header>
      <main>{children}</main>
      <footer>
        <p>PICO Y PLACA HOY</p>
        <p>{year}</p>
      </footer>
    </>
  );
}

Layout.defaultProps = {
  home: false,
};
