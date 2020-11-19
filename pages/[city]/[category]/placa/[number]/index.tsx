import { GetStaticPaths, GetStaticProps } from 'next';
import {
  getCitiesMap2,
  ICityMap2,
  ICategoryMap2,
  ICategoryData2,
  getCityData2,
} from '@mauriciorobayo/pyptron';
import cn from 'classnames';

import Layout from '../../../../../components/layout/layout';
import Date from '../../../../../components/date/date';
import {
  getInfoFromSlug,
  listFormat,
  Scheme,
} from '../../../../../utils/utils';
import NumberLinks from '../../../../../components/number-links/number-links';
import Hours from '../../../../../components/hours/hours';
import LicensePlate from '../../../../../components/license-plate/license-plate';
import styles from './index.module.scss';

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
  const {
    name: categoryName,
    path: categoryPath,
    data: [pypData],
  } = categoryData;
  const header = (
    <header>
      <h1>{`Pico y placa ${categoryData.name.toLowerCase()} en ${cityName} placa ${number}`}</h1>
    </header>
  );
  const hasRestriction = pypData.numbers.includes(Number(number));
  const schemeString =
    pypData.scheme === Scheme.FirstNumber ? 'terminadas' : 'iniciadas';
  const licenseString = (
    <>
      las placas {schemeString} en <LicensePlate>{number}</LicensePlate>
    </>
  );

  return (
    <Layout header={header}>
      <div
        className={cn(styles.semaphore, {
          [styles.hasRestriction]: hasRestriction,
        })}
      >
        {number}
      </div>
      <div className={styles.title}>
        <Date />, {licenseString}{' '}
        <strong>
          {hasRestriction
            ? 'tienen restricción en los siguientes horarios:'
            : 'no tienen restricción.'}
        </strong>
      </div>
      {hasRestriction ? (
        <div>
          <Hours hours={pypData.hours} />
        </div>
      ) : (
        <div>
          Hoy tienen pico y placa los {listFormat(pypData.vehicleClasses)} con
          placas {schemeString} en{' '}
          <LicensePlate>{pypData.numbers.join('-')}</LicensePlate>.
        </div>
      )}
      <div>
        <h4>Prográmese</h4>
        <div>
          En los próximos 30 días {licenseString} tienen pico y placa los días:
          <ol>
            {categoryData.data.map((data) => {
              if (data.numbers.includes(Number(number))) {
                return (
                  <li key={data.date}>
                    <Date date={data.date} />
                  </li>
                );
              }
              return null;
            })}
          </ol>
        </div>
      </div>
      <NumberLinks
        path={categoryPath}
        cityName={cityName}
        categoryName={categoryName}
        numberSelected={number}
      />
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
      days: 30,
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
