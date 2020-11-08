import React from 'react';
import cn from 'classnames';
import styles from './license-plate.module.scss';

type LicensePlateProps = {
  children: React.ReactNode;
  publicLicense?: boolean;
  className: string;
  size?: 'small' | 'medium' | 'big';
};

export default function LicensePlate({
  children,
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
      {children}
    </div>
  );
}

LicensePlate.defaultProps = {
  publicLicense: false,
  size: 'medium',
};
