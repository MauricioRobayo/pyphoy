// eslint-disable-next-line import/prefer-default-export
export function convert24toAMPM(hour24: string) {
  if (hour24 === '12:00') return `${hour24}m.`;
  const [hours, minutes] = hour24.split(':');
  const hoursNumber = parseInt(hours, 10);
  if (hoursNumber === 12) return `${hour24}pm`;
  return hoursNumber > 12
    ? `${hoursNumber - 12}:${minutes}pm`
    : `${hoursNumber}:${minutes}am`;
}
