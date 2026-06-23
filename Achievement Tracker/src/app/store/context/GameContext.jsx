import { createContext, useContext } from "react";

export const GameContext = createContext(null);
export const DispatchContext = createContext(null);

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
