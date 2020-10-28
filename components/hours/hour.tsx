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

export default function Hour({ hourData }: HourProps) {
  const ALL_DAY = 'Todo el día';
  const hasComment = hourData.comment !== '';
  const isAllDay = hourData.comment === ALL_DAY;

  return (
    <div>
      {hasComment && !isAllDay ? <div>{hourData.comment}</div> : null}
      <ul>
        {hourData.hours.map((hour) => {
          return (
            <li key={JSON.stringify(hour)}>
              <div>
                {isAllDay ? ALL_DAY : hourData.comment}
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
