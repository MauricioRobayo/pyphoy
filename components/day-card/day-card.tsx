import cn from 'classnames';
import { IHourData } from '@mauriciorobayo/pyptron';

import LicensePlate from '../license-plate/license-plate';
import Date from '../date/date';
import { Scheme } from '../../utils/utils';
import { dateIsToday } from '../date/utils';
import Hours from '../hours/hours';
import styles from './day-card.module.scss';

type DayCardProps = {
  scheme: Scheme;
  categoryKey: string;
  date: string;
  numbersString: string;
  hours: IHourData[];
  isPublicLicense?: boolean;
  hasRestriction?: boolean;
};

export default function DayCard({
  scheme,
  categoryKey,
  date,
  numbersString,
  hours,
  isPublicLicense,
  hasRestriction,
}: DayCardProps) {
  const schemeMessage = scheme === Scheme.FirstNumber ? 'primer' : 'último';
  const isToday = dateIsToday(date);
  return (
    <div
      key={date}
      className={cn(styles.card, {
        [styles.today]: isToday,
        [styles.na]: !hasRestriction,
      })}
    >
      <div>
        <div
          className={cn(styles.title, {
            [styles[categoryKey]]: isToday,
            [styles.today]: isToday,
          })}
        >
          <Date date={date} type="short" />
        </div>
        {hasRestriction && isToday ? (
          <div>
            <Hours hours={hours} interactive />
          </div>
        ) : null}
      </div>
      <div className={styles.license}>
        <LicensePlate
          publicLicense={isPublicLicense}
          size={isToday ? 'large' : 'medium'}
        >
          {numbersString}
        </LicensePlate>
        {hasRestriction && isToday ? (
          <div className={styles.scheme}>
            <span role="img" aria-label="No circulan" title="No circulan">
              🛑
            </span>
            {' '}
            {schemeMessage}
            {' '}
            dígito
          </div>
        ) : null}
      </div>
    </div>
  );
}

DayCard.defaultProps = {
  isPublicLicense: false,
  hasRestriction: true,
};
