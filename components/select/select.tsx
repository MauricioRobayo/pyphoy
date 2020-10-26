import { ChangeEvent } from 'react';
import { useRouter } from 'next/router';

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
  const router = useRouter();

  function onChangeHandler(event: ChangeEvent<HTMLSelectElement>) {
    router.push(event.target.value);
  }

  return (
    <>
      <select
        aria-label={name}
        name={name}
        id={id}
        defaultValue={name}
        onChange={onChangeHandler}
      >
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
