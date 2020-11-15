import { getWeekdayName, getLocalShortDateString } from './utils';
import styles from './date.module.scss';

type DateProps = { dateString: string };

export default function PypDate({ dateString }: DateProps) {
  const currentDate = new Date(dateString);
  const localShortDateString = getLocalShortDateString(currentDate);
  const weekdayName = getWeekdayName(currentDate);

  return (
    <time dateTime={currentDate.toISOString()}>
      <span>{weekdayName}</span>
      {' '}
      <span className={styles.small}>{localShortDateString}</span>
    </time>
  );
}
