import { ICategoryData } from '@mauriciorobayo/pyptron';
import styles from './categories-table.module.scss';
import CategoryCard from '../category-card/category-card';

type CategoryTableProps = {
  categories: Record<string, ICategoryData>;
  citySlug: string;
};

export default function CategoriesTable({
  citySlug,
  categories,
}: CategoryTableProps) {
  const categoriesData = Object.entries(categories);

  return (
    <div className={styles.categoryTable}>
      <h3 className={styles.title}>
        Se restringe la circulación de los siguientes vehículos
      </h3>
      {categoriesData.map(
        ([
          categorySlug,
          {
            name: categoryName,
            data: [{ numbers, scheme, hours }],
          },
        ]) => {
          return (
            <CategoryCard
              categoryName={categoryName}
              categorySlug={categorySlug}
              citySlug={citySlug}
              hours={hours}
              numbers={numbers}
              scheme={scheme}
            />
          );
        }
      )}
    </div>
  );
}
