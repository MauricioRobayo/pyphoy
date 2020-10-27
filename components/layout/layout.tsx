import { ReactNode } from 'react';
import Head from 'next/head';
import styles from './Layout.module.scss';
import useDate from '../../hooks/useDate';

type LayoutProps = {
  children: ReactNode;
  home?: boolean;
  header?: ReactNode;
};

export default function Layout({ children, home, header }: LayoutProps) {
  const { year } = useDate();

  return (
    <>
      <Head>
        <title>
          Toda la información sobre el pico y placa en Colombia | Pico y placa
          hoy
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {home ? null : (
        <nav>
          <img
            className={styles.pypLogo}
            src="/pyphoy-logo.svg"
            alt="Pyphoy logo"
          />
        </nav>
      )}
      {header}
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
  header: null,
};
