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
import PypDate from '../../../../../components/date/date';
import {
  getInfoFromSlug,
  listFormat,
  Scheme,
} from '../../../../../utils/utils';
import NumberLinks from '../../../../../components/number-links/number-links';
// import Hour from '../../../../../components/hour/hour';
import Hours from '../../../../../components/hours/hours';
import LicensePlate from '../../../../../components/license-plate/license-plate';
import styles from './index.module.scss';
import utilStyles from '../../../../../styles/utils.module.scss';

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
    data: [{ numbers, scheme, vehicleClasses, hours }],
  } = categoryData;
  const header = (
    <header>
      <h1>{`Pico y placa ${categoryData.name.toLowerCase()} en ${cityName} placa ${number}`}</h1>
    </header>
  );
  const hasRestriction = numbers.includes(Number(number));
  const schemeString =
    scheme === Scheme.FirstNumber ? 'terminadas' : 'iniciadas';
  const licenseString = (
    <>
      placas {schemeString} en <LicensePlate>{number}</LicensePlate>
    </>
  );
  const vehicleClassesString = listFormat(vehicleClasses);

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
        <PypDate />, {licenseString}{' '}
        <strong>
          {hasRestriction
            ? 'tienen restricción en el siguiente horario:'
            : 'no tienen restricción.'}
        </strong>
      </div>
      {hasRestriction ? (
        <div className={utilStyles.textCenter}>
          <Hours hours={hours} />
        </div>
      ) : (
        <div>
          Hoy tienen pico y placa los {vehicleClassesString} con placas{' '}
          {schemeString} en <LicensePlate>{numbers.join('-')}</LicensePlate>.
        </div>
      )}
      <div>
        <h4 className={styles.title}>Prográmese</h4>
        <div className={utilStyles.textCenter}>
          Los {vehicleClassesString} con {licenseString} tienen pico y placa el
          próximo:
          <ol>
            {categoryData.data.slice(1).map((data) => {
              if (data.numbers.includes(Number(number))) {
                return (
                  <li key={data.date}>
                    <PypDate date={data.date} />
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
