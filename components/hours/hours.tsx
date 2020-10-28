/* eslint-disable react/no-array-index-key */
import { HourData } from '@mauriciorobayo/pyptron';
import Hour from './hour';

type HoursProps = {
  hours: HourData[];
  interactive?: boolean;
};

export default function Hours({ hours, interactive }: HoursProps) {
  return (
    <div className={interactive ? 'interactive' : ''}>
      {hours.map((hourData, index) => (
        <Hour key={index} hourData={hourData} />
      ))}
    </div>
  );
}

Hours.defaultProps = {
  interactive: false,
};
