import {
  getWeekdayName,
  getLocalShortDateString,
  getLocalLongDateString,
} from './utils';
import styles from './date.module.scss';

type DateProps = {
  date?: Date;
  type?: 'long' | 'short';
};

export default function PypDate({
  date = new Date(),
  type = 'long',
}: DateProps) {
  const currentDate = new Date(date);
  currentDate.setUTCHours(5, 0, 0, 0); // Colombian TZ

  if (type === 'long') {
    const localLongDateString = getLocalLongDateString(currentDate);
    return (
      <time dateTime={currentDate.toISOString()}>{localLongDateString}</time>
    );
  }

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

PypDate.defaultProps = {
  date: new Date(),
  type: 'long',
};
