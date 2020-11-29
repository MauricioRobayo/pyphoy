import { ICategoryData2 } from '@mauriciorobayo/pyptron';

type CategoryDataProps = {
  categoryData: ICategoryData2;
};

export default function CategoryInfo({ categoryData }: CategoryDataProps) {
  const {
    decrees,
    data: [{ exceptions, observations, maps }],
  } = categoryData;
  const decreesList =
    decrees.length === 0 ? null : (
      <>
        <h4>Decretos</h4>
        <ul>
          {decrees.map(({ url, name }) => (
            <li key={url}>
              <a href={url}>{name}</a>
            </li>
          ))}
        </ul>
      </>
    );

  /* eslint-disable react/no-danger */
  const exceptionsContent =
    exceptions === '' ? null : (
      <>
        <h4>Excepciones</h4>
        <div dangerouslySetInnerHTML={{ __html: exceptions }} />
      </>
    );

  const observationsContent =
    observations === '' ? null : (
      <>
        <h4>Observaciones</h4>
        <div dangerouslySetInnerHTML={{ __html: exceptions }} />
      </>
    );
  /* eslint-enable */

  const mapsList =
    maps.length === 0 ? null : (
      <>
        <h4>Decretos</h4>
        <ul>
          {maps.map(({ url, name }) => (
            <li key={url}>
              <a href={url}>{name}</a>
            </li>
          ))}
        </ul>
      </>
    );

  return (
    <section>
      {decreesList}
      {exceptionsContent}
      {observationsContent}
      {mapsList}
    </section>
  );
}
