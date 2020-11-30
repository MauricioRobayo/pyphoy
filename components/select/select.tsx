import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { PypOption } from '../../types';

type SelectProps = {
  pypOptions: PypOption[];
};

export default function Select({ pypOptions }: SelectProps) {
  const [selectedOption, setSelectedOption] = useState('');
  const router = useRouter();

  function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    const { value: targetValue } = event.target;

    const isAvailableOption = pypOptions.some(({ name: optionName }) => {
      const regexp = new RegExp(targetValue, 'i');
      return regexp.test(optionName);
    });

    if (!isAvailableOption) {
      return;
    }

    const targetOption = pypOptions.find(({ name: optionName }) => {
      return optionName === targetValue;
    });

    if (targetOption) {
      setSelectedOption(targetOption.name);
      router.push(targetOption.value);
    }

    setSelectedOption(targetValue);
  }

  return (
    <>
      <input
        list="pyp-options"
        aria-label="Pico y placa en:"
        id="pypOption"
        onChange={onChangeHandler}
        value={selectedOption}
      />
      <datalist id="pyp-options">
        {pypOptions.map(({ name: optionName, value }) => (
          <option key={value} value={optionName} aria-label={optionName} />
        ))}
      </datalist>
    </>
  );
}
