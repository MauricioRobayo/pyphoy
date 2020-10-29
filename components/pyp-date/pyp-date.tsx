function localISOString(date: Date): string {
  const d = new Date(date);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().split('T')[0];
}

function weekdayName(day: number): string {
  return [
    'domingo',
    'lunes',
    'martes',
    'miércoles',
    'jueves',
    'viernes',
    'sábado',
  ][day];
}

export default function PypDate({ dateString }: { dateString: string }) {
  const currentDate = new Date(dateString);
  const currentISODate = currentDate.toISOString();
  const currentISODateShort = localISOString(currentDate);
  const currentLocalDate = currentISODateShort.replace(/-/g, '/');
  const currentLocalDay = weekdayName(currentDate.getDay());
  return (
    <time dateTime={currentISODate}>
      <span>{currentLocalDay}</span>
      <span>{currentLocalDate}</span>
    </time>
  );
}
