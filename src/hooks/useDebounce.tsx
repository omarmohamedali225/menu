import { useEffect, useState } from "react";

export default function useDebounce(value: string, t: number) {
  const [depounced, setDepounced] = useState(value);
  useEffect(() => {
    const time = setTimeout(() => setDepounced(value), t);
    return () => clearTimeout(time);
  }, [value, t]);
  return depounced;
}
