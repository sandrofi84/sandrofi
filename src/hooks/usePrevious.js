import { useRef, useEffect } from "react";

export default function usePrevious(value) {
  const previousValue = useRef(null);

  useEffect(() => {
    previousValue.current = value;
  }, [value]);

  return previousValue.current;
}
