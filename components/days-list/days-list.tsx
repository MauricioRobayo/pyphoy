import { ICategoryData2 } from '@mauriciorobayo/pyptron';

import DayCard from '../day-card/day-card';
import styles from './days-list.module.scss';
import {
  isPublicLicense,
  pypNumbersToString,
  listFormat,
  NA,
} from '../../utils/utils';

enum Scheme {
  LastNumber,
  FirstNumber,
}

type DaysTableProps = {
  categoryData: ICategoryData2;
};

export default function DaysList({ categoryData }: DaysTableProps) {
  const {
    name: categoryName,
    key: categoryKey,
    data: [{ vehicleClasses, scheme }],
  } = categoryData;
  const vehicleClassesList = listFormat(vehicleClasses);
  const schemeMessage = scheme === Scheme.FirstNumber ? 'primer' : 'último';

  return (
    <article className={styles.list}>
      <h3 className={styles.title}>
        Se restringe la circulación de
        {' '}
        <strong className={styles.strong}>{vehicleClassesList}</strong>
        {' '}
        según el
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
    </article>
  );
}
