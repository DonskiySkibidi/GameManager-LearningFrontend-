import { useGlobalGame } from "@shared/lib/usageContext";

export function useArchivedGame() {
  const { items: games } = useGlobalGame();
  const archivedGames = games.filter((game) => game.status === "archived");
  return archivedGames;
}
