import { GetStaticPaths, GetStaticProps } from 'next';
import {
  getCitiesMap2,
  ICityMap2,
  ICategoryMap2,
  ICategoryData2,
  getCityData2,
} from '@mauriciorobayo/pyptron';
import Layout from '../../../../../components/layout/layout';
import Date from '../../../../../components/date/date';
import { getInfoFromSlug } from '../../../../../utils/utils';

type CategoryProps = {
  categoryData: ICategoryData2;
  cityName: string;
  number: string;
};

export default function Category({
  categoryData,
  cityName,
  number,
}: CategoryProps) {
  const header = (
    <header>
      <h1>{`Pico y placa ${categoryData.name.toLowerCase()} en ${cityName}`}</h1>
      <h2>
        <Date />
      </h2>
    </header>
  );

  return (
    <Layout header={header}>
      Hello
      {number}
    </Layout>
);
}

export const getStaticPaths: GetStaticPaths = async () => {
  const citiesMap = getCitiesMap2();
  const paths: any = [];
  citiesMap.forEach(({ slug: citySlug, categories }) => {
    categories.forEach(({ slug: categorySlug }) => {
      const numbers =
        citySlug === 'manizales' &&
        categorySlug === 'transporte-publico-colectivo'
          ? ['H', 'I', 'J', 'A', 'B', 'C', 'D', 'E', 'F', 'G']
          : ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
      numbers.forEach((number) =>
        paths.push({
          params: { city: citySlug, category: categorySlug, number },
        })
      );
    });
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const citySlug = params?.city as string;
  const categorySlug = params?.category as string;
  const citiesMap = getCitiesMap2();
  const {
    key: cityKey,
    name: cityName,
    categories: categoriesMap,
  } = getInfoFromSlug<ICityMap2>(citySlug, citiesMap);
  const { key: categoryKey } = getInfoFromSlug<ICategoryMap2>(
    categorySlug,
    categoriesMap
  );
  const categoryData = getInfoFromSlug<ICategoryData2>(
    categorySlug,
    getCityData2(cityKey, {
      categoryKey: [categoryKey],
      days: 8,
    }).categories
  );
  return {
    props: {
      cityName,
      categoryData,
      number: params?.number,
    },
  };
};
