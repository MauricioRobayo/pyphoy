import cn from 'classnames';
import { IHourData } from '@mauriciorobayo/pyptron';
import Link from 'next/link';
import { useContext } from 'react';

import LicensePlate from '../license-plate/license-plate';
import Date from '../date/date';
import { Scheme, ALL_DIGITS } from '../../utils/utils';
import { areSameDate } from '../date/utils';
import Hours from '../hours/hours';
import styles from './day-card.module.scss';
import DateContext from '../../contexts/date-context';

type DayCardProps = {
  scheme: Scheme;
  categoryKey: string;
  date: string;
  numbersString: string;
  hours: IHourData[];
  path: string;
  isPublicLicense?: boolean;
  hasRestriction?: boolean;
};

export default function DayCard({
  scheme,
  categoryKey,
  date,
  numbersString,
  hours,
  path,
  isPublicLicense,
  hasRestriction,
}: DayCardProps) {
  const currentDate = useContext(DateContext);
  const schemeString =
    scheme === Scheme.FirstNumber ? 'terminadas' : 'iniciadas';
  const isAllDigits = numbersString === ALL_DIGITS;
  const isCurrentDate = areSameDate(date, currentDate);

  return (
    <div
      key={date}
      className={cn(styles.card, {
        [styles.current]: isCurrentDate,
        [styles.na]: !hasRestriction,
      })}
    >
      <div>
        <div
          className={cn(styles.title, {
            [styles[categoryKey]]: isCurrentDate,
            [styles.current]: isCurrentDate,
          })}
        >
          <Link href={`/${path}?d=${date.substr(0, 10)}`}>
            <a>
              <Date date={date} type="short" />
            </a>
          </Link>
        </div>
        {hasRestriction && isCurrentDate ? (
          <div>
            <Hours hours={hours} interactive />
          </div>
        ) : null}
      </div>
      <div className={styles.license}>
        {hasRestriction && !isAllDigits && isCurrentDate ? (
          <div className={styles.scheme}>
            No circulan placas {schemeString} en
          </div>
        ) : null}
        <LicensePlate
          publicLicense={isPublicLicense}
          size={isCurrentDate ? 'large' : 'medium'}
        >
          {numbersString}
        </LicensePlate>
      </div>
    </div>
  );
}

DayCard.defaultProps = {
  isPublicLicense: false,
  hasRestriction: true,
};
