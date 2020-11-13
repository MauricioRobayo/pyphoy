import Link from 'next/link';
import { IHourData } from '@mauriciorobayo/pyptron';
import cn from 'classnames';

import { Scheme } from '../../types';
import Hours from '../hours/hours';
import LicensePlate from '../license-plate/license-plate';
import utilStyles from '../../styles/utils.module.scss';
import styles from './category-card.module.scss';

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

const ALL_DIGITS = 'Todos';

function hasAllDigits(numbers: number[]) {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].every((num) => numbers.includes(num));
}

function pypNumbersToString(numbers: number[]) {
  if (numbers.length === 0) {
    return 'No aplica';
  }

  if (hasAllDigits(numbers)) {
    return ALL_DIGITS;
  }

  return numbers.join('-');
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
  const hasRestriction = numbers.length > 0;
  return (
    <article
      key={categoryName}
      className={cn(styles.categoryRow, {
        [styles.na]: !hasRestriction,
      })}
    >
      <Link href={path}>
        <a>
          <h4 className={styles.categoryTitle}>{categoryName}</h4>
        </a>
      </Link>
      {hasRestriction ? (
        <div>
          <h5>Horario</h5>
          <Hours className={utilStyles.mx_1} hours={hours} interactive />
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
