import Link from 'next/link';
import { IHourData } from '@mauriciorobayo/pyptron';
import cn from 'classnames';

import { Scheme } from '../../types';
import Hours from '../hours/hours';
import LicensePlate from '../license-plate/license-plate';
import styles from './category-card.module.scss';
import { pypNumbersToString, ALL_DIGITS, NA } from '../../utils/utils';

type CategoryCardProps = {
  path: string;
  numbers: number[];
  hours: IHourData[];
  categoryName: string;
  scheme: Scheme;
};

function isPublicLicense(categoryName: string) {
  const lowerCaseName = categoryName.toLowerCase();
  return lowerCaseName === 'taxis' || lowerCaseName.includes('público');
}

export default function CategoryCard({
  numbers,
  path,
  categoryName,
  hours,
  scheme,
}: CategoryCardProps) {
  const numbersString = pypNumbersToString(numbers);
  const allDigits = numbersString === ALL_DIGITS;
  const hasRestriction = numbersString !== NA;
  return (
    <article
      key={categoryName}
      className={cn(styles.card, {
        [styles.na]: !hasRestriction,
      })}
    >
      <Link href={path}>
        <a>
          <h4 className={styles.title}>{categoryName}</h4>
        </a>
      </Link>
      {hasRestriction ? (
        <div>
          <h5>Horario</h5>
          <Hours hours={hours} interactive />
        </div>
      ) : null}
      <LicensePlate
        publicLicense={isPublicLicense(categoryName)}
        size={hasRestriction ? 'big' : 'medium'}
      >
        {numbersString}
      </LicensePlate>
      {allDigits || !hasRestriction ? null : (
        <div>
          {`${
            scheme === Scheme.FirstNumber ? 'Primer dígito' : 'Último dígito'
          } del número de la placa`}
        </div>
      )}
    </article>
  );
}
