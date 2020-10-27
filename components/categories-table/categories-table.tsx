export default function CategoriesTable() {
  return (
    <table>
      <thead>
        <tr>
          <th>Categoría</th>
          <th>Placas</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <a href="/soacha/particulares">
              <span role="img" aria-label="Pico y placa Soacha particulares">
                🚗
              </span>
              Particulares
            </a>
          </td>
          <td>
            <span>NA</span>
          </td>
        </tr>
        <tr>
          <td>
            <a href="/soacha/transporte-publico-colectivo">
              <span
                role="img"
                aria-label="Pico y placa Soacha transporte público colectivo"
              >
                🚌
              </span>
              Transporte Público Colectivo
            </a>
            <ul data-comment="" data-days="">
              <li>
                6:00am a 8:00pm
                <span>8h 31m</span>
              </li>
            </ul>
          </td>
          <td>
            <span>5</span>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
