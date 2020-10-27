import { useState, useEffect } from 'react';

export default function useCurrentDate(date = new Date()) {
  date.setHours(0, 0, 0, 0);

  const [year, setYear] = useState(date.getFullYear());
  const [ISODateString, setISODateString] = useState('');
  const [localDateString, setLocalDateString] = useState('');

  useEffect(() => {
    setISODateString(date.toISOString());
    setLocalDateString(
      date.toLocaleDateString('es-CO', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    );
    setYear(date.getFullYear());
  }, []);

  return {
    date,
    year,
    ISODateString,
    localDateString,
  };
}
