import { useEffect, useState } from "react";

export default function useDebounce<T>(
  value: T,
  delay: number,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [debouncedState, setDebouncedState] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedState(value), delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return [debouncedState, setDebouncedState];
}
