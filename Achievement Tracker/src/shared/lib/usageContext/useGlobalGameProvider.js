import { useGameContext, useGameDispatch } from "@app/store";

export function useGlobalGame() {
  return useGameContext();
}

export function useGlobalGameDispatch() {
  return useGameDispatch();
}
