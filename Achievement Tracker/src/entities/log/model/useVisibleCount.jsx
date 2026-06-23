import { useState } from "react";
export function useVisibleCount() {
  const [visibleCount, setVisibleCount] = useState(5);
  return {
    visibleCount: visibleCount,
    setVisibleCount: setVisibleCount,
  };
}
