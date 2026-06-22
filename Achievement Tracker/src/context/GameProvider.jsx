import { useEffect } from "react";
import { GameContext, DispatchContext, gameReducer } from "./GameContext";
import { useImmerReducer } from "use-immer";
import { getAllGames } from "../shared/api/gamesApi";
import {
  getInitialLogsArray,
  setLogsLocalStorage,
} from "../helpers/logsFunctions";

import { getInitialTheme, setTheme } from "../helpers/themeSave";

const initialLogs = getInitialLogsArray();
const initialTheme = getInitialTheme();
export default function GameProvider({ children }) {
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
