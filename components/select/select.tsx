import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/router';

type Option = {
  name: string;
  value: string;
};

type SelectProps = {
  name: string;
  id: string;
  options: Option[];
};

export default function Select({ name, id, options }: SelectProps) {
  const [selectedOption, setSelectedOption] = useState('');
  const router = useRouter();

  function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    const { value: targetValue } = event.target;

    const isAvailableOption = options.some(({ name: optionName }) => {
      const regexp = new RegExp(targetValue, 'i');
      return regexp.test(optionName);
    });

    if (!isAvailableOption) {
      return;
    }

    setSelectedOption(targetValue);

    const targetOption = options.find(({ name: optionName }) => {
      return optionName === targetValue;
    });

    if (!targetOption) {
      return;
    }

    setSelectedOption(targetOption.name);
    router.push(targetOption.value);
  }

  return (
    <>
      <input
        list="pyp-options"
        aria-label={name}
        id={id}
        onChange={onChangeHandler}
        value={selectedOption}
      />
      <datalist id="pyp-options">
        {options.map(({ name: optionName, value }) => (
          <option key={value} value={optionName} aria-label={optionName} />
        ))}
      </datalist>
    </>
  );
}
