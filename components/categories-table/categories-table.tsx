import { CategoryData } from '@mauriciorobayo/pyptron';

type CategoryTableProps = {
  cityName: string;
  categories: Record<string, CategoryData>;
};

export default function CategoriesTable({
  cityName,
  categories,
}: CategoryTableProps) {
  const categoriesNames = Object.values(categories);

  return (
    <table>
      <thead>
        <tr>
          <th>Categoría</th>
          <th>Placas</th>
        </tr>
      </thead>
      <tbody>
        {categoriesNames.map(
          ({ name: categoryName, emoji, data: [currentData] }) => {
            return (
              <tr key={categoryName}>
                <td>
                  <span
                    role="img"
                    aria-label={`Pico y placa ${cityName} ${categoryName}`}
                  >
                    {emoji}
                  </span>
                  {categoryName}
                </td>
                <td>{currentData.numbers.join('-')}</td>
              </tr>
            );
          }
        )}
      </tbody>
    </table>
  );
}
