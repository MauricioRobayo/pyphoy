export function weekdayName(day: number): string {
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

export function monthName(month: number): string {
  return [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ][month];
}

export function localISOString(date: Date): string {
  const d = new Date(date);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().split('T')[0];
}

export function getLongLocalDateString(date: Date = new Date()): string {
  return `${weekdayName(date.getDay())}, ${date.getDate()} de ${monthName(
    date.getMonth()
  )} de ${date.getFullYear()}`;
}
