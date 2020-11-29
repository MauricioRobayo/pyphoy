import { ReactNode } from 'react';
import Head from 'next/head';
import styles from './Layout.module.scss';
import Email from '../email/email';
import CTA from '../call-to-action/call-to-action';
import LicensePlate from '../license-plate/license-plate';
import utilStyles from '../../styles/utils.module.scss';

type LayoutProps = {
  children: ReactNode;
  home?: boolean;
  header?: ReactNode;
  aside?: ReactNode;
};

export default function Layout({ header, children, home, aside }: LayoutProps) {
  return (
    <div className={styles.site}>
      <Head>
        j
        <title>
          Toda la información sobre el pico y placa en Colombia | Pico y placa
          hoy
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {home ? null : (
        <nav>
          <LicensePlate size="large">PYPHOY</LicensePlate>
        </nav>
      )}
      <div className={utilStyles.textCenter}>{header}</div>
      <div className={styles.site}>
        <main className={styles.main}>{children}</main>
        {home ? null : <CTA />}
      </div>
      {aside ? <aside>{aside}</aside> : null}
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
  aside: null,
};
