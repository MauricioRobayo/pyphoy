import { CategoryData } from '@mauriciorobayo/pyptron';
import Hours from '../hours/hours';
import LicensePlate from '../license-plate/license-plate';
import styles from './categories-table.module.scss';

function isPublicLicense(categoryName: string) {
  const lowerCaseName = categoryName.toLowerCase();
  return lowerCaseName === 'taxis' || lowerCaseName.includes('público');
}

enum Scheme {
  LastNumber,
  FirstNumber,
}

type CategoryTableProps = {
  categories: Record<string, CategoryData>;
};

export default function CategoriesTable({ categories }: CategoryTableProps) {
  const categoriesData = Object.values(categories);

  return (
    <div className={styles.categoryTable}>
      {categoriesData.map(
        ({ name: categoryName, data: [{ numbers, scheme, hours }] }) => {
          return (
            <div key={categoryName} className={styles.categoryRow}>
              <div>{categoryName}</div>
              <div>
                {scheme === Scheme.FirstNumber
                  ? 'Primer dígito'
                  : 'Último dígito'}
              </div>
              <Hours hours={hours} interactive />
              <LicensePlate
                numbers={numbers}
                publicLicense={isPublicLicense(categoryName)}
              />
            </div>
          );
        }
      )}
    </div>
  );
}
