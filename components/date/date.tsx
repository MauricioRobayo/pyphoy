import { localISOString, weekdayName } from './utils';
import styles from './date.module.scss';

type DateProps = { dateString: string };

export default function PypDate({ dateString }: DateProps) {
  const currentDate = new Date(dateString);
  const currentISODate = currentDate.toISOString();
  const currentISODateShort = localISOString(currentDate);
  const currentLocalDate = currentISODateShort.replace(/-/g, '/');
  const currentLocalDay = weekdayName(currentDate.getDay());
  return (
    <time dateTime={currentISODate}>
      <span>{currentLocalDay}</span>
      {' '}
      <span className={styles.small}>{currentLocalDate}</span>
    </time>
  );
}
