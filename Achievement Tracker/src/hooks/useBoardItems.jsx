import { useGameContext, useGameDispatch } from "../context/GameContext";
import { useState, useEffect } from "react";
import { groupGamesByStatus } from "../helpers/groupGames";
export function useBoardItems() {
  const { items: games } = useGameContext();
  const dispatch = useGameDispatch();
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
