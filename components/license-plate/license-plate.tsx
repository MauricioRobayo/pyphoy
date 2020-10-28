import styles from './license-plate.module.scss';

function hasAllDigits(numbers: number[]) {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].every((num) => numbers.includes(num));
}

function pypNumbersToString(numbers: number[]) {
  if (numbers.length === 0) {
    return 'NA';
  }

  if (hasAllDigits(numbers)) {
    return 'TODOS';
  }

  return numbers.join('-');
}

type LicensePlateProps = {
  numbers: number[];
  publicLicense?: boolean;
};

export default function LicensePlate({
  numbers,
  publicLicense,
}: LicensePlateProps) {
  return (
    <div
      className={`${styles.licensePlate} ${publicLicense ? styles.public : ''}`}
    >
      {pypNumbersToString(numbers)}
    </div>
  );
}

LicensePlate.defaultProps = {
  publicLicense: false,
};
