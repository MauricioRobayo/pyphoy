import { IHourData } from '@mauriciorobayo/pyptron';

import { isEmptyArray, convert24toAMPM } from './utils';
import styles from './hour.module.scss';
import { ALL_DAY } from '../../utils/utils';

type HourProps = {
  hourData: IHourData;
};

export default function Hour({ hourData: { hours, comment } }: HourProps) {
  const hasComment = comment !== '';
  const isAllDay = comment === ALL_DAY;

  return (
    <div>
      {hasComment && !isAllDay ? <div>{comment}</div> : null}
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
