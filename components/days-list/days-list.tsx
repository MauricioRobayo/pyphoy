import { ICategoryData } from '@mauriciorobayo/pyptron';
import Hours from '../hours/hours';
import LicensePlate from '../license-plate/license-plate';
import styles from './days-list.module.scss';
import utilStyles from '../../styles/utils.module.scss';
import PypDate from '../pyp-date/pyp-date';

enum Scheme {
  LastNumber,
  FirstNumber,
}

type DaysTableProps = {
  categoryData: ICategoryData;
};

function isPublicLicense(categoryName: string) {
  const lowerCaseName = categoryName.toLowerCase();
  return lowerCaseName === 'taxis' || lowerCaseName.includes('público');
}

const ALL_DIGITS = 'Todos';

function hasAllDigits(numbers: number[]) {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].every((num) => numbers.includes(num));
}

function pypNumbersToString(numbers: number[]) {
  if (numbers.length === 0) {
    return 'No aplica';
  }

  if (hasAllDigits(numbers)) {
    return ALL_DIGITS;
  }

  return numbers.join('-');
}

function listFormat(array: string[]) {
  return array.reduce((formatedList, listElement, index) => {
    if (index === 0) {
      return listElement.toLowerCase();
    }
    if (index === array.length - 1) {
      return `${formatedList} y ${listElement.toLowerCase()}`;
    }
    return `${formatedList}, ${listElement.toLowerCase()}`;
  }, '');
}

export default function DaysList({ categoryData }: DaysTableProps) {
  const {
    name: categoryName,
    data: [{ vehicleClasses, scheme }],
  } = categoryData;
  const vehicleClassesList = listFormat(vehicleClasses);
  const schemeMessage = scheme === Scheme.FirstNumber ? 'primer' : 'ultimo';

  return (
    <article className={styles.categoryTable}>
      <h3 className={styles.title}>
        {`Se restringe la circulación de ${vehicleClassesList} según el ${schemeMessage} dígito del número de la placa`}
      </h3>
      {categoryData.data.map(({ date, numbers, hours }) => {
        const numbersString = pypNumbersToString(numbers);
        const hasRestriction = numbers.length > 0;

        return (
          <div key={date} className={styles.categoryRow}>
            <PypDate dateString={date} />
            {hasRestriction ? (
              <div>
                <Hours className={utilStyles.mx_1} hours={hours} interactive />
              </div>
            ) : null}
            <LicensePlate
              publicLicense={isPublicLicense(categoryName)}
              size={hasRestriction ? 'big' : 'medium'}
            >
              {numbersString}
            </LicensePlate>
          </div>
        );
      })}
    </article>
  );
}
