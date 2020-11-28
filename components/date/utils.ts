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

export function areSameDate(date1: Date | string, date2: Date | string) {
  const currentDate1 = new Date(date1);
  const currentDate2 = new Date(date2);
  const sameDate = currentDate1.getUTCDate() === currentDate2.getUTCDate();
  const sameMonth = currentDate1.getUTCMonth() === currentDate2.getUTCMonth();
  const sameYear =
    currentDate1.getUTCFullYear() === currentDate2.getUTCFullYear();

  return sameDate && sameMonth && sameYear;
  // currentDate1.setUTCHours(5, 0, 0, 0); // Colombian TZ
  // currentDate2.setUTCHours(5, 0, 0, 0); // Colombian TZ

  // return currentDate1.toISOString() === currentDate2.toISOString();
}

export function dateIsToday(date: Date | string): boolean {
  return areSameDate(date, new Date());
}
