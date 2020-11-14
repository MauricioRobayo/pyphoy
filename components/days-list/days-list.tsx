import { ICategoryData2 } from '@mauriciorobayo/pyptron';
import cn from 'classnames';

import Hours from '../hours/hours';
import LicensePlate from '../license-plate/license-plate';
import styles from './days-list.module.scss';
import utilStyles from '../../styles/utils.module.scss';
import Date from '../date/date';
import { pypNumbersToString, listFormat, NA } from '../../utils/utils';

enum Scheme {
  LastNumber,
  FirstNumber,
}

type DaysTableProps = {
  categoryData: ICategoryData2;
};

function isPublicLicense(categoryName: string) {
  const lowerCaseName = categoryName.toLowerCase();
  return lowerCaseName === 'taxis' || lowerCaseName.includes('público');
}

export default function DaysList({ categoryData }: DaysTableProps) {
  const {
    name: categoryName,
    data: [{ vehicleClasses, scheme }],
  } = categoryData;
  const vehicleClassesList = listFormat(vehicleClasses);
  const schemeMessage = scheme === Scheme.FirstNumber ? 'primer' : 'último';

  return (
    <article className={styles.list}>
      <h3 className={styles.title}>
        {`Se restringe la circulación de ${vehicleClassesList} según el ${schemeMessage} dígito del número de la placa`}
      </h3>
      {categoryData.data.map(({ date, numbers, hours }) => {
        const numbersString = pypNumbersToString(numbers);
        const hasRestriction = numbersString !== NA;
        return (
          <div
            key={date}
            className={cn(styles.row, {
              [styles.na]: !hasRestriction,
            })}
          >
            <div>
              <Date dateString={date} />
              {hasRestriction ? (
                <div>
                  <Hours
                    className={utilStyles.mx_1}
                    hours={hours}
                    interactive
                  />
                </div>
              ) : null}
            </div>
            <LicensePlate
              publicLicense={isPublicLicense(categoryName)}
              size={hasRestriction ? 'big' : 'medium'}
            >
              {numbersString}
            </LicensePlate>
          </div>
        );
      })}
    </article>
  );
}
