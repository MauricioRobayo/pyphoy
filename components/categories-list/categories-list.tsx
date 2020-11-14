import { ICategoryData2 } from '@mauriciorobayo/pyptron';
import styles from './categories-list.module.scss';
import CategoryCard from '../category-card/category-card';

type CategoryListProps = {
  categories: ICategoryData2[];
};

export default function CategoriesList({ categories }: CategoryListProps) {
  return (
    <div className={styles.categoryTable}>
      <h3 className={styles.title}>
        Se restringe la circulación de los siguientes vehículos
      </h3>
      {categories.map(
        ({ path, name: categoryName, data: [{ numbers, scheme, hours }] }) => {
          return (
            <CategoryCard
              key={path}
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
