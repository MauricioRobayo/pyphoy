import { ReactNode } from 'react';
import Head from 'next/head';
import styles from './Layout.module.scss';
import Email from '../email/email';
import CTA from '../call-to-action/call-to-action';
import LicensePlate from '../license-plate/license-plate';

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
            <LicensePlate size="large">PYPHOY</LicensePlate>
          </nav>
        )}
        {header}
        <main className={styles.mainContent}>{children}</main>
        {home ? null : <CTA />}
      </div>
      <footer className={styles.footer}>
        <p>PICO Y PLACA HOY</p>
        <Email />
      </footer>
    </div>
  );
}

Layout.defaultProps = {
  home: false,
  header: null,
};
