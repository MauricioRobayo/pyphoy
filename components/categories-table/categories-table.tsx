import { Fragment } from 'react';
import { CategoryData } from '@mauriciorobayo/pyptron';

type CategoryTableProps = {
  categories: Record<string, CategoryData>;
};

export default function CategoriesTable({ categories }: CategoryTableProps) {
  const categoriesData = Object.values(categories);

  return (
    <div>
      {categoriesData.map(({ name: categoryName, data: [currentData] }) => {
        return (
          <Fragment key={categoryName}>
            <div>{categoryName}</div>
            <div>{currentData.numbers.join('-')}</div>
          </Fragment>
        );
      })}
    </div>
  );
}
