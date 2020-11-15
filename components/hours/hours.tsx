import { IHourData } from '@mauriciorobayo/pyptron';
import Hour from './hour';

type HoursProps = {
  className: string;
  hours: IHourData[];
  interactive?: boolean;
};

export default function Hours({ hours, interactive, className }: HoursProps) {
  return (
    /* eslint-disable react/no-array-index-key */
    <div className={`${interactive ? 'interactive' : ''} ${className}`}>
      {hours.map((hourData, index) => (
        <Hour key={index} hourData={hourData} />
      ))}
    </div>
    /* eslint-enable */
  );
}

Hours.defaultProps = {
  interactive: false,
};
