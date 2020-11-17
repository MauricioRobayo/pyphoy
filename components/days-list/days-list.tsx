import Link from 'next/link';
import { ICategoryData2 } from '@mauriciorobayo/pyptron';

import DayCard from '../day-card/day-card';
import styles from './days-list.module.scss';
import {
  isPublicLicense,
  pypNumbersToString,
  listFormat,
  NA,
  Scheme,
} from '../../utils/utils';

type DaysTableProps = {
  cityName: string;
  categoryData: ICategoryData2;
};

export default function DaysList({ cityName, categoryData }: DaysTableProps) {
  const {
    name: categoryName,
    key: categoryKey,
    path: categoryPath,
    data: [{ vehicleClasses, scheme }],
  } = categoryData;
  const vehicleClassesList = listFormat(vehicleClasses);
  const schemeMessage = scheme === Scheme.FirstNumber ? 'primer' : 'último';
  // console.log({cityName, categoryName})
  const pypNumbers =
    cityName === 'Manizales' && categoryName === 'Transporte publico colectivo'
      ? ['H', 'I', 'J', 'A', 'B', 'C', 'D', 'E', 'F', 'G']
      : ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  return (
    <article className={styles.list}>
      <main>
        <h3 className={styles.title}>
          Se restringe la circulación de
          {' '}
          <strong className={styles.strong}>{vehicleClassesList}</strong>
          {' '}
          según
          el
          {' '}
          <strong className={styles.strong}>
            {schemeMessage}
            {' '}
            dígito del número de la placa
          </strong>
        </h3>
        {categoryData.data.map(({ date, numbers, hours }) => {
          const numbersString = pypNumbersToString(numbers);
          return (
            <DayCard
              scheme={scheme}
              categoryKey={categoryKey}
              key={date}
              date={date}
              numbersString={numbersString}
              hours={hours}
              isPublicLicense={isPublicLicense(categoryName)}
              hasRestriction={numbersString !== NA}
            />
          );
        })}
      </main>
      <footer>
        <div>¿Cuándo tengo pico y placa?</div>
        {console.log({ categoryPath })}
        {pypNumbers.map((pypNumber) => (
          <Link href={`/${categoryPath}/placa/${pypNumber}`}>
            <a>{pypNumber}</a>
          </Link>
        ))}
      </footer>
    </article>
  );
}
