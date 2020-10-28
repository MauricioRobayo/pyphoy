import { CategoryData } from '@mauriciorobayo/pyptron';
import Hours from '../hours/hours';
import LicensePlate from '../license-plate/license-plate';
import styles from './categories-table.module.scss';

enum Scheme {
  LastNumber,
  FirstNumber,
}

type CategoryTableProps = {
  categories: Record<string, CategoryData>;
};

function isPublicLicense(categoryName: string) {
  const lowerCaseName = categoryName.toLowerCase();
  return lowerCaseName === 'taxis' || lowerCaseName.includes('público');
}

function hasAllDigits(numbers: number[]) {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].every((num) => numbers.includes(num));
}

function pypNumbersToString(numbers: number[]) {
  if (numbers.length === 0) {
    return 'NA';
  }

  if (hasAllDigits(numbers)) {
    return 'TODOS';
  }

  return numbers.join('-');
}

export default function CategoriesTable({ categories }: CategoryTableProps) {
  const categoriesData = Object.values(categories);

  return (
    <div className={styles.categoryTable}>
      <h4>No pueden circular los siguientes vehículos</h4>
      {categoriesData.map(
        ({ name: categoryName, data: [{ numbers, scheme, hours }] }) => {
          const numbersString = pypNumbersToString(numbers);
          return (
            <article key={categoryName} className={styles.categoryRow}>
              <h4>{categoryName}</h4>
              <Hours hours={hours} interactive />
              <LicensePlate
                numbers={numbersString}
                publicLicense={isPublicLicense(categoryName)}
              />
              {numbersString === 'TODOS' ? null : (
                <div>
                  {`${
                    scheme === Scheme.FirstNumber
                      ? 'Primer dígito'
                      : 'Último dígito'
                  } del número de la placa`}
                </div>
              )}
            </article>
          );
        }
      )}
    </div>
  );
}
