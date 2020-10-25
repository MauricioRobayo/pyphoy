type Option = {
  value: string;
  text: string;
};

type SelectProps = {
  name: string;
  id: string;
  options: Option[];
};

export default function Select({ name, id, options }: SelectProps) {
  return (
    <>
      <select aria-label={name} name={name} id={id} defaultValue={name}>
        <option value={name} disabled hidden>{`${name}...`}</option>
        {options.map(({ value, text }) => (
          <option key={value} value={value}>
            {text}
          </option>
        ))}
      </select>
    </>
  );
}
