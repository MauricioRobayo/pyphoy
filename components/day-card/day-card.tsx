import cn from 'classnames';
import { IHourData } from '@mauriciorobayo/pyptron';

import LicensePlate from '../license-plate/license-plate';
import Date from '../date/date';
import { dateIsToday } from '../date/utils';
import Hours from '../hours/hours';
import styles from './day-card.module.scss';

type DayCardProps = {
  categoryKey: string;
  date: string;
  numbersString: string;
  hours: IHourData[];
  isPublicLicense?: boolean;
  hasRestriction?: boolean;
};

export default function DayCard({
  categoryKey,
  date,
  numbersString,
  hours,
  isPublicLicense,
  hasRestriction,
}: DayCardProps) {
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
        {hasRestriction ? (
          <div>
            <Hours hours={hours} interactive />
          </div>
        ) : null}
      </div>
      <LicensePlate
        publicLicense={isPublicLicense}
        size={hasRestriction ? 'large' : 'medium'}
      >
        {numbersString}
      </LicensePlate>
    </div>
  );
}

DayCard.defaultProps = {
  isPublicLicense: false,
  hasRestriction: true,
};
