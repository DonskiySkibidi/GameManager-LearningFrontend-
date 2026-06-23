import { useEffect } from "react";
import { getAllGames } from "@shared/api/gamesApi";
import { useImmerReducer } from "use-immer";
import { gameReducer } from "@app/store";
import {
  getInitialLogsArray,
  setLogsLocalStorage,
  getInitialTheme,
  setTheme,
} from "@shared/lib/localStorage";

import { GameContext, DispatchContext } from "@app/store";

const initialLogs = getInitialLogsArray();
const initialTheme = getInitialTheme();

export function GameProvider({ children }) {
  const [gameState, dispatch] = useImmerReducer(gameReducer, {
    items: [],
    isLoading: true,
    activityLog: initialLogs,
    theme: initialTheme,
  });
  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      try {
        const json = await getAllGames();
        dispatch({
          type: "setGames",
          data: json,
        });
      } catch (error) {
        console.error("Ошибка получения данных:", error);
      }
    }
    if (!ignore) {
      fetchData();
    }
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      setLogsLocalStorage(gameState.activityLog);
    }
    return () => {
      ignore = true;
    };
  }, [gameState.activityLog]);

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      setTheme(gameState.theme);
    }
    return () => {
      ignore = true;
    };
  }, [gameState.theme]);

  return (
    <GameContext value={gameState}>
      <DispatchContext value={dispatch}>{children}</DispatchContext>
    </GameContext>
  );
}
