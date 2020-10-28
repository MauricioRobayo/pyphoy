import styles from './license-plate.module.scss';

type LicensePlateProps = {
  numbers: string;
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
      {numbers}
    </div>
  );
}

LicensePlate.defaultProps = {
  publicLicense: false,
};
