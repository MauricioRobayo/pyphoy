import { Fragment } from 'react';
import { CategoryData } from '@mauriciorobayo/pyptron';
import Hours from '../hours/hours';

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
    <div>
      {categoriesData.map(
        ({ name: categoryName, data: [{ numbers, scheme, hours }] }) => {
          return (
            <Fragment key={categoryName}>
              <div>{categoryName}</div>
              <Hours hours={hours} interactive />
              <div>
                {scheme === Scheme.FirstNumber
                  ? 'Primer dígito'
                  : 'Último dígito'}
              </div>
              <div>{numbers.join('-')}</div>
            </Fragment>
          );
        }
      )}
    </div>
  );
}
