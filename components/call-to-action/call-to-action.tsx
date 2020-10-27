import styles from './call-to-action.module.scss';

export default function CTA() {
  return (
    <div className={styles.cta}>
      <p>¿Falta algo?</p>
      <p>¿Algo no está bien?</p>
      <a href="http://m.me/picoyplacahoy">Ayúdenos a mejorar esta página</a>
    </div>
  );
}
