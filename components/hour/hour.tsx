import { useContext } from 'react';
import { IHourData } from '@mauriciorobayo/pyptron';

import { convert24toAMPM } from './utils';
import styles from './hour.module.scss';
import { isEmptyArray, ALL_DAY } from '../../utils/utils';
import dateContext from '../../contexts/date-context';

type HourProps = {
  hourData: IHourData;
};

export default function Hour({
  hourData: { hours, comment, days },
}: HourProps) {
  const hasComment = comment !== '';
  const isAllDay = comment === ALL_DAY;

  const date = useContext(dateContext);

  return (
    <div>
      {hasComment && !isAllDay ? (
        <div className={styles.title}>{comment}</div>
      ) : null}
      <ul className={styles.hours}>
        {hours.map((hour, index) => {
          /* eslint-disable react/no-array-index-key */
          if (isAllDay) {
            return (
              <li key={index} className={styles.hour}>
                {ALL_DAY}
              </li>
            );
          }

          if (isEmptyArray(hour)) {
            return null;
          }

          if (days.length > 0 && !days.includes(date.getDay())) {
            return null;
          }

          return (
            <li key={index} className={styles.hour}>
              <span>
                {hour.map((hour24) => convert24toAMPM(hour24)).join(' a ')}
              </span>
            </li>
          );
          /* eslint-enable */
        })}
      </ul>
    </div>
  );
}
