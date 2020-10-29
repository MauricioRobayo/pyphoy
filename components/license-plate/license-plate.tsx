import cn from 'classnames';
import styles from './license-plate.module.scss';

type LicensePlateProps = {
  numbers: string;
  publicLicense?: boolean;
  className: string;
  size?: 'small' | 'medium' | 'big';
};

export default function LicensePlate({
  numbers,
  publicLicense = false,
  className,
  size = 'medium',
}: LicensePlateProps) {
  return (
    <div
      className={cn(styles.licensePlate, className, styles[size], {
        [styles.public]: publicLicense,
      })}
    >
      {numbers}
    </div>
  );
}

LicensePlate.defaultProps = {
  publicLicense: false,
  size: 'medium',
};
