import Link from 'next/link';

import styles from './number-links.module.scss';

type NumberLinksProps = {
  path: string;
  cityName: string;
  categoryName: string;
  numberSelected?: string | null;
};

export default function NumberLinks({
  path,
  cityName,
  categoryName,
  numberSelected,
}: NumberLinksProps) {
  const numbers =
    cityName === 'Manizales' && categoryName === 'Transporte publico colectivo'
      ? ['H', 'I', 'J', 'A', 'B', 'C', 'D', 'E', 'F', 'G']
      : ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  return (
    <div className={styles.numberLinks}>
      <h4 className={styles.title}>¿Cuándo tengo pico y placa?</h4>
      <div>
        {numbers.map((number) => {
          if (number === numberSelected) {
            return (
              <span className={styles.selected} key={number}>
                {number}
              </span>
            );
          }
          return (
            <Link key={number} href={`/${path}/placa/${number}`}>
              <a className={styles.link}>{number}</a>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

NumberLinks.defaultProps = {
  numberSelected: null,
};
