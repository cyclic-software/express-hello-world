import { useCallback, useState } from 'react';

export const usePersistedState = (key: string, defaultValue: string): [string, (newValue: string) => void] => {
  const [value, setValue] = useState<string>(localStorage.getItem(key) ?? defaultValue);

  const handleChange = useCallback(
    (newValue: string) => {
      setValue(newValue);
      localStorage.setItem(key, newValue);
    },
    [key],
  );

  return [value, handleChange];
};
