import { useGlobalGame, useGlobalGameDispatch } from "@shared/lib/usageContext";
import { useState, useEffect } from "react";
import { groupGamesByStatus } from "@widgets/kanbanBoard/lib";
export function useBoardItems() {
  const { items: games } = useGlobalGame();
  const dispatch = useGlobalGameDispatch();
  const [items, setItems] = useState(() => groupGamesByStatus(games));

  useEffect(() => {
    setItems(groupGamesByStatus(games));
  }, [games]);
  return {
    items: items,
    setItems: setItems,
    dispatch: dispatch,
  };
}
