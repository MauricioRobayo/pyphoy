import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import {
  getCitiesMap2,
  ICityMap2,
  ICategoryMap2,
  ICategoryData2,
  getCityData2,
} from '@mauriciorobayo/pyptron';

import DateContext from '../../../contexts/date-context';
import Layout from '../../../components/layout/layout';
import DaysList from '../../../components/days-list/days-list';
import PypDate from '../../../components/date/date';
import { getInfoFromSlug } from '../../../utils/utils';
import CategoryInfo from '../../../components/category-info/category-info';

type CategoryProps = {
  cityKey: string;
  categoryKey: string;
  categoryData: ICategoryData2;
  cityName: string;
};

export default function Category({
  cityKey,
  categoryKey,
  categoryData,
  cityName,
}: CategoryProps) {
  const router = useRouter();
  const { d: date, category: categorySlug } = router.query;

  let data = categoryData;
  let queryDate = new Date();

  // a date query string was provided
  if (typeof date === 'string') {
    queryDate = new Date(date);
    data = getInfoFromSlug<ICategoryData2>(
      categorySlug as string,
      getCityData2(cityKey, {
        date: queryDate,
        categoryKey: [categoryKey],
        days: 8,
      }).categories
    );
  }

  const header = (
    <header>
      <h1>{`Pico y placa ${data.name.toLowerCase()} en ${cityName}`}</h1>
      <h2>
        <PypDate date={queryDate} />
      </h2>
    </header>
  );

  return (
    <Layout header={header}>
      <DateContext.Provider value={queryDate}>
        <DaysList cityName={cityName} categoryData={data} />
      </DateContext.Provider>
      <CategoryInfo />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const citiesMap = getCitiesMap2();
  return {
    paths: citiesMap
      .map(({ slug: citySlug, categories }) => {
        return categories.map(({ slug: categorySlug }) => {
          return { params: { city: citySlug, category: categorySlug } };
        });
      })
      .flat(),
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
      cityKey,
      categoryKey,
      citiesMap,
      cityName,
      categoryData,
    },
  };
};
