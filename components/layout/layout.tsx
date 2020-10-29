import { ReactNode } from 'react';
import Head from 'next/head';
import styles from './Layout.module.scss';

type LayoutProps = {
  children: ReactNode;
  home?: boolean;
  header?: ReactNode;
};

export default function Layout({ children, home, header }: LayoutProps) {
  return (
    <div className={styles.site}>
      <Head>
        <title>
          Toda la información sobre el pico y placa en Colombia | Pico y placa
          hoy
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.siteContent}>
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
        <main className={styles.mainContent}>{children}</main>
      </div>
      <footer className={styles.footer}>
        <p>PICO Y PLACA HOY</p>
      </footer>
    </div>
  );
}

Layout.defaultProps = {
  home: false,
  header: null,
};
