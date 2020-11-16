import { IHourData } from '@mauriciorobayo/pyptron';
import Hour from '../hour/hour';

type HoursProps = {
  hours: IHourData[];
  interactive?: boolean;
};

export default function Hours({ hours, interactive }: HoursProps) {
  return (
    /* eslint-disable react/no-array-index-key */
    <div className={`${interactive ? 'interactive' : ''}`}>
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
