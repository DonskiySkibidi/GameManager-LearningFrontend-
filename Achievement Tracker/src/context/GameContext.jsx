import { createContext, useContext } from "react";
export const GameContext = createContext(null);
export const DispatchContext = createContext(null);

export function gameReducer(draft, action) {
  switch (action.type) {
    case "setGames": {
      draft.items = action.data;
      draft.isLoading = false;
      break;
    }
    case "addGame": {
      draft.items.push(action.payload);
      const date = new Date();
      draft.activityLog.push({
        id: crypto.randomUUID(),
        type: "addGame",
        gameTitle: action.payload.title,
        gameId: action.payload.id,
        date: `${date.getDate()}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getFullYear()}`,
      });
      if (draft.activityLog.length > 30) {
        draft.activityLog.shift();
      }
      break;
    }
    case "updateGame": {
      const index = draft.items.findIndex(
        (game) => game.id === action.payload.id,
      );
      if (index !== -1) {
        draft.items[index] = action.payload;
        const date = new Date();
        const log = {
          id: crypto.randomUUID(),
          type: "update",
          gameTitle: action.payload.title,
          gameId: action.payload.id,
          date: `${date.getDate()}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getFullYear()}`,
        };
        switch (action.how) {
          case "archived": {
            log.type = "archived";
            break;
          }
          case "board": {
            log.type = "board";
            log.newStatus = action.newStatus;
            break;
          }
        }
        draft.activityLog.push(log);
        if (draft.activityLog.length > 30) {
          draft.activityLog.shift();
        }
      }
      break;
    }
    case "deleteGame": {
      draft.items = draft.items.filter(
        (game) => game.id !== action.deleteGameId,
      );
      const date = new Date();
      draft.activityLog.push({
        id: crypto.randomUUID(),
        type: "delete",
        gameTitle: action.gameTitle,
        gameId: action.deleteGameId,
        date: `${date.getDate()}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getFullYear()}`,
      });
      if (draft.activityLog.length > 30) {
        draft.activityLog.shift();
      }
      break;
    }
    case "clearLogs": {
      draft.activityLog = [];
      break;
    }
    case "changeAlgorithm": {
      draft.theme = action.payload;
      break;
    }
    case "restoreBackup": {
      draft.items = action.payload.games;
      draft.activityLog = action.payload.logs;
      draft.theme = action.payload.theme;
      break;
    }
    default: {
      throw Error("Неизвестное действие: " + action.type);
    }
  }
}

export function useGameContext() {
  try {
    const context = useContext(GameContext);
    if (!context) throw new Error("Ошбика получения стейта");
    return context;
  } catch (error) {
    console.error(error);
  }
}

export function useGameDispatch() {
  try {
    const context = useContext(DispatchContext);
    if (!context) throw new Error("Ошбика получения диспатча");
    return context;
  } catch (error) {
    console.error(error);
  }
}
