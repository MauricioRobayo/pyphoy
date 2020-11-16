import {
  getWeekdayName,
  getLocalShortDateString,
  getLocalLongDateString,
} from './utils';
import styles from './date.module.scss';

type DateProps = {
  date?: Date | string;
  type?: 'long' | 'short';
};

export default function PypDate({
  date = new Date(),
  type = 'long',
}: DateProps) {
  const currentDate = new Date(date);
  const today = new Date();
  currentDate.setUTCHours(5, 0, 0, 0); // Colombian TZ
  today.setUTCHours(5, 0, 0, 0); // Colombian TZ

  const currentDateISOString = currentDate.toISOString();
  const todayISOString = today.toISOString();

  const isToday =
    todayISOString.substr(0, 10) === currentDateISOString.substr(0, 10);

  if (type === 'long') {
    const localLongDateString = getLocalLongDateString(currentDate);
    return (
      <time dateTime={currentDateISOString}>
        {isToday ? `Hoy ${localLongDateString}` : localLongDateString}
      </time>
    );
  }

  const localShortDateString = getLocalShortDateString(currentDate);
  const weekdayName = getWeekdayName(currentDate);
  return (
    <time dateTime={currentDateISOString}>
      <span>{isToday ? `Hoy ${weekdayName}` : weekdayName}</span>
      {' '}
      <span className={styles.small}>{localShortDateString}</span>
    </time>
  );
}

PypDate.defaultProps = {
  date: new Date(),
  type: 'long',
};
