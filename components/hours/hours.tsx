/* eslint-disable react/no-array-index-key */
import { HourData } from '@mauriciorobayo/pyptron';
import Hour from './hour';

type HoursProps = {
  className: string;
  hours: HourData[];
  interactive?: boolean;
};

export default function Hours({ hours, interactive, className }: HoursProps) {
  return (
    <div className={`${interactive ? 'interactive' : ''} ${className}`}>
      {hours.map((hourData, index) => (
        <Hour key={index} hourData={hourData} />
      ))}
    </div>
  );
}

Hours.defaultProps = {
  interactive: false,
};
