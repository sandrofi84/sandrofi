import { useRef, useEffect } from "react";

export default function usePrevious(value) {
  const previousValue = useRef(null);
  console.log("usePrevious, current is ", previousValue)
  useEffect(() => {
    console.log("effect inside usePrevious")
    previousValue.current = value;
  }, [value]);

  return previousValue.current;
}
