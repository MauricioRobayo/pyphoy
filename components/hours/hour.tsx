import { IHourData } from '@mauriciorobayo/pyptron';
import styles from './hour.module.scss';
import { ALL_DAY } from '../../utils/utils';

function convert24toAMPM(hour24: string) {
  if (hour24 === '12:00') return `${hour24}m.`;
  const [hours, minutes] = hour24.split(':');
  const hoursNumber = parseInt(hours, 10);
  if (hoursNumber === 12) return `${hour24}pm`;
  return hoursNumber > 12
    ? `${hoursNumber - 12}:${minutes}pm`
    : `${hoursNumber}:${minutes}am`;
}

function isEmptyArray(array: [string, string] | []): array is [] {
  return array.length === 0;
}

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
