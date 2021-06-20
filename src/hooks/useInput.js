import { useState } from 'react';

const useInput = (validation) => {
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);

  const isValidValue = validation(value);
  const isError = !isValidValue && touched;

  const touchedHandler = () => {
    setTouched(true);
    // alert(isValidValue);
  };

  const valueChangedHandler = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setTouched(false);
    setValue('');
  };

  return {
    value,
    isValidValue,
    isError,
    touchedHandler,
    valueChangedHandler,
    reset,
  };
};

export default useInput;
