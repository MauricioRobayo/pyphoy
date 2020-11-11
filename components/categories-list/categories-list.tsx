import { ICategoryData } from '@mauriciorobayo/pyptron';
import styles from './categories-list.module.scss';
import CategoryCard from '../category-card/category-card';

type CategoryListProps = {
  categories: Record<string, ICategoryData>;
};

export default function CategoriesList({ categories }: CategoryListProps) {
  const categoriesData = Object.values(categories);

  return (
    <div className={styles.categoryTable}>
      <h3 className={styles.title}>
        Se restringe la circulación de los siguientes vehículos
      </h3>
      {categoriesData.map(
        ({
          key,
          path,
          name: categoryName,
          data: [{ numbers, scheme, hours }],
        }) => {
          return (
            <CategoryCard
              key={key}
              path={path}
              categoryName={categoryName}
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
