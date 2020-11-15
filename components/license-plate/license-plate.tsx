import React from 'react';
import cn from 'classnames';
import styles from './license-plate.module.scss';

type LicensePlateProps = {
  children: React.ReactNode;
  publicLicense?: boolean;
  size?: 'small' | 'medium' | 'large';
};

export default function LicensePlate({
  children,
  publicLicense = false,
  size = 'medium',
}: LicensePlateProps) {
  return (
    <div
      className={cn(styles.licensePlate, styles[size], {
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
