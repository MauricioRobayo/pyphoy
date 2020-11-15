import cn from 'classnames';
import { IHourData } from '@mauriciorobayo/pyptron';

import LicensePlate from '../license-plate/license-plate';
import Date from '../date/date';
import Hours from '../hours/hours';
import styles from './day-card.module.scss';

type DayCardProps = {
  date: string;
  numbersString: string;
  hours: IHourData[];
  isPublicLicense?: boolean;
  hasRestriction?: boolean;
};

export default function DayCard({
  date,
  numbersString,
  hours,
  isPublicLicense,
  hasRestriction,
}: DayCardProps) {
  return (
    <div
      key={date}
      className={cn(styles.card, {
        [styles.na]: !hasRestriction,
      })}
    >
      <div>
        <Date dateString={date} />
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
