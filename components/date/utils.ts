const dateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'America/Bogota',
};

const formatter = new Intl.DateTimeFormat('es-CO', dateTimeFormatOptions);

export function getDateFormattedParts(
  date: Date = new Date()
): Intl.DateTimeFormatPart[] {
  return formatter.formatToParts(date);
}

export function getWeekdayName(date: Date = new Date()): string {
  const parts = getDateFormattedParts(date);
  const weekdayName = parts.find(
    ({ type }: Intl.DateTimeFormatPart) => type === 'weekday'
  ) as Intl.DateTimeFormatPart;
  return weekdayName.value;
}

export function getLocalLongDateString(date: Date = new Date()): string {
  return formatter.format(date);
}

export function getLocalShortDateString(date: Date = new Date()): string {
  const shortDateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timeZone: 'America/Bogota',
  };
  const f = new Intl.DateTimeFormat('es-CO', shortDateTimeFormatOptions);
  return f.format(date);
}
