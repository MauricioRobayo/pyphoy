import { HourData } from '@mauriciorobayo/pyptron';

function convert24toAMPM(hour24: string) {
  if (hour24 === '12:00') return `${hour24}m.`;
  const [hours, minutes] = hour24.split(':');
  const hoursNumber = parseInt(hours, 10);
  if (hoursNumber === 12) return `${hour24}pm`;
  return hoursNumber > 12
    ? `${hoursNumber - 12}:${minutes}pm`
    : `${hoursNumber}:${minutes}am`;
}

type HourProps = {
  hourData: HourData;
};

export default function Hour({ hourData: { hours, comment } }: HourProps) {
  const ALL_DAY = 'Todo el día';
  const hasComment = comment !== '';
  const isAllDay = comment === ALL_DAY;

  return (
    <div>
      {hasComment && !isAllDay ? <div>{comment}</div> : null}
      <ul>
        {hours.map((hour) => {
          if (hour.length === 0) {
            return null;
          }
          return (
            <li key={JSON.stringify(hour)}>
              <div>
                {isAllDay ? ALL_DAY : comment}
                <span>
                  {hour.map((hour24) => convert24toAMPM(hour24)).join(' a ')}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
