import { ICategoryData2 } from '@mauriciorobayo/pyptron';

import DayCard from '../day-card/day-card';
import NumberLinks from '../number-links/number-links';
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
        <NumberLinks
          path={categoryPath}
          cityName={cityName}
          categoryName={categoryName}
        />
      </footer>
    </article>
  );
}
