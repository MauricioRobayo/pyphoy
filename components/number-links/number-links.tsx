import Link from 'next/link';

type NumberLinksProps = {
  path: string;
  cityName: string;
  categoryName: string;
};

export default function NumberLinks({
  path,
  cityName,
  categoryName,
}: NumberLinksProps) {
  const numbers =
    cityName === 'Manizales' && categoryName === 'Transporte publico colectivo'
      ? ['H', 'I', 'J', 'A', 'B', 'C', 'D', 'E', 'F', 'G']
      : ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  return (
    <>
      <div>¿Cuándo tengo pico y placa?</div>
      {numbers.map((pypNumber) => (
        <Link href={`/${path}/placa/${pypNumber}`}>
          <a>{pypNumber}</a>
        </Link>
      ))}
    </>
  );
}
